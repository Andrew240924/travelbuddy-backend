import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Route } from '../routes/route.entity';
import { SavedRoute } from '../saved-routes/saved-route.entity';
import { Favorite } from '../favorites/favorite.entity';

type AccountReport = {
  generatedAt: string;
  user: User;
  routes: Route[];
  publishedRoutes: Route[];
  completedRoutes: Route[];
  savedRoutes: SavedRoute[];
  favorites: Favorite[];
};

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Route)
    private routesRepository: Repository<Route>,
    @InjectRepository(SavedRoute)
    private savedRoutesRepository: Repository<SavedRoute>,
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  async getAccountReport(userId: number): Promise<AccountReport> {
    const user = await this.usersRepository.findOne({
      where: { userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const routes = await this.routesRepository.find({
      where: { author: { userId } },
      relations: ['author'],
      order: { routeId: 'DESC' },
    });

    const savedRoutes = await this.savedRoutesRepository.find({
      where: { user: { userId } },
      relations: ['route', 'route.author'],
      order: { savedRouteId: 'DESC' },
    });

    const favorites = await this.favoritesRepository.find({
      where: { user: { userId } },
      relations: ['route', 'route.author'],
      order: { favoriteId: 'DESC' },
    });

    return {
      generatedAt: new Date().toISOString(),
      user,
      routes,
      publishedRoutes: routes.filter((route) => route.visibility === 'public'),
      completedRoutes: routes.filter((route) => route.isCompleted),
      savedRoutes,
      favorites,
    };
  }

  toXml(report: AccountReport): string {
    const xmlEscape = (value: unknown) =>
      String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

    const routeNode = (route: Route) =>
      `<route id="${route.routeId}" title="${xmlEscape(route.title)}" visibility="${route.visibility}" isCompleted="${route.isCompleted}" durationDays="${xmlEscape(route.durationDays ?? '')}" imageUrl="${xmlEscape(route.imageUrl ?? '')}" description="${xmlEscape(route.description ?? '')}" />`;

    const savedNode = (item: SavedRoute) =>
      `<item id="${item.savedRouteId}" routeId="${item.route?.routeId ?? ''}" routeTitle="${xmlEscape(item.route?.title ?? '')}" routeVisibility="${xmlEscape(item.route?.visibility ?? '')}" routeCompleted="${xmlEscape(item.route?.isCompleted ?? '')}" />`;

    const favoriteNode = (item: Favorite) =>
      `<item id="${item.favoriteId}" routeId="${item.route?.routeId ?? ''}" routeTitle="${xmlEscape(item.route?.title ?? '')}" routeVisibility="${xmlEscape(item.route?.visibility ?? '')}" routeCompleted="${xmlEscape(item.route?.isCompleted ?? '')}" />`;

    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      `<accountReport generatedAt="${report.generatedAt}">`,
      `<user id="${report.user.userId}" email="${xmlEscape(report.user.email)}" username="${xmlEscape(report.user.username)}" />`,
      `<stats totalRoutes="${report.routes.length}" publishedRoutes="${report.publishedRoutes.length}" completedRoutes="${report.completedRoutes.length}" savedRoutes="${report.savedRoutes.length}" favoriteRoutes="${report.favorites.length}" />`,
      '<routes>',
      ...report.routes.map(routeNode),
      '</routes>',
      '<publishedRoutes>',
      ...report.publishedRoutes.map(routeNode),
      '</publishedRoutes>',
      '<completedRoutes>',
      ...report.completedRoutes.map(routeNode),
      '</completedRoutes>',
      '<savedRoutes>',
      ...report.savedRoutes.map(savedNode),
      '</savedRoutes>',
      '<favorites>',
      ...report.favorites.map(favoriteNode),
      '</favorites>',
      '</accountReport>',
    ].join('\n');
  }

  toHtml(report: AccountReport): string {
    const htmlEscape = (value: unknown) =>
      String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const routeRow = (route: Route) => `
      <tr>
        <td>${route.routeId}</td>
        <td>${htmlEscape(route.title)}</td>
        <td>${htmlEscape(route.visibility)}</td>
        <td>${route.isCompleted ? 'yes' : 'no'}</td>
        <td>${htmlEscape(route.durationDays ?? '')}</td>
      </tr>
    `;

    const savedRow = (item: SavedRoute) => `
      <tr>
        <td>${item.savedRouteId}</td>
        <td>${item.route?.routeId ?? ''}</td>
        <td>${htmlEscape(item.route?.title ?? '')}</td>
        <td>${htmlEscape(item.route?.visibility ?? '')}</td>
      </tr>
    `;

    const favoriteRow = (item: Favorite) => `
      <tr>
        <td>${item.favoriteId}</td>
        <td>${item.route?.routeId ?? ''}</td>
        <td>${htmlEscape(item.route?.title ?? '')}</td>
        <td>${htmlEscape(item.route?.visibility ?? '')}</td>
      </tr>
    `;

    return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Account report</title>
  <style>
    body { font-family: Segoe UI, Arial, sans-serif; margin: 24px; color: #111; }
    h1, h2 { margin: 0 0 12px; }
    .meta, .stats { margin-bottom: 20px; }
    .stats span { display: inline-block; margin-right: 18px; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 24px; }
    th, td { border: 1px solid #dcdcdc; padding: 8px; text-align: left; }
    th { background: #f5f5f5; }
  </style>
</head>
<body>
  <h1>Account Report</h1>
  <div class="meta">
    <div><strong>Generated at:</strong> ${htmlEscape(report.generatedAt)}</div>
    <div><strong>User ID:</strong> ${report.user.userId}</div>
    <div><strong>Email:</strong> ${htmlEscape(report.user.email)}</div>
    <div><strong>Username:</strong> ${htmlEscape(report.user.username)}</div>
  </div>

  <div class="stats">
    <h2>Summary</h2>
    <span><strong>Total routes:</strong> ${report.routes.length}</span>
    <span><strong>Published:</strong> ${report.publishedRoutes.length}</span>
    <span><strong>Completed:</strong> ${report.completedRoutes.length}</span>
    <span><strong>Saved:</strong> ${report.savedRoutes.length}</span>
    <span><strong>Favorites:</strong> ${report.favorites.length}</span>
  </div>

  <h2>All Routes</h2>
  <table>
    <thead>
      <tr><th>ID</th><th>Title</th><th>Visibility</th><th>Completed</th><th>Duration Days</th></tr>
    </thead>
    <tbody>${report.routes.map(routeRow).join('')}</tbody>
  </table>

  <h2>Saved Routes</h2>
  <table>
    <thead>
      <tr><th>Saved ID</th><th>Route ID</th><th>Route Title</th><th>Visibility</th></tr>
    </thead>
    <tbody>${report.savedRoutes.map(savedRow).join('')}</tbody>
  </table>

  <h2>Favorites</h2>
  <table>
    <thead>
      <tr><th>Favorite ID</th><th>Route ID</th><th>Route Title</th><th>Visibility</th></tr>
    </thead>
    <tbody>${report.favorites.map(favoriteRow).join('')}</tbody>
  </table>
</body>
</html>
    `.trim();
  }
}
