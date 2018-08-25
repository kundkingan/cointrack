import { NotFoundPageComponent } from './containers/not-found-page/not-found-page.component'
import { EntryComponent } from './containers/entry/entry.component'
import { MainComponent } from './containers/main/main.component'
import { AccountComponent } from './containers/account/account.component'
import { UserGuard } from './user-guard'

export const routes = [
	{
		path: '',
		redirectTo: 'entry',
		pathMatch: 'full'
	},
	{
		path: 'entry',
		component: EntryComponent
	},
	{
		path: 'main',
		component: MainComponent,
		canActivate: [ UserGuard ]
	},
	{
		path: 'account',
		component: AccountComponent,
		canActivate: [ UserGuard ]
	},
	{
		path: 'page-not-found',
		component: NotFoundPageComponent
	},
	{
		path: '**',
		component: NotFoundPageComponent
	}
]
