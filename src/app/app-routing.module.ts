import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./pages/recipe/recipe-list/recipe-list.module').then( m => m.RecipeListPageModule),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'recipes/create',
    loadChildren: () => import('./pages/recipe/recipe-create/recipe-create.module').then( m => m.RecipeCreatePageModule),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'recipes/:id',
    loadChildren: () => import('./pages/recipe/recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'recipes/:id/edit',
    loadChildren: () => import('./pages/recipe/recipe-edit/recipe-edit.module').then( m => m.RecipeEditPageModule),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'email-verify',
    loadChildren: () => import('./pages/auth/email-verify/email-verify.module').then( m => m.EmailVerifyPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile-detail',
    loadChildren: () => import('./pages/profile/profile-detail/profile-detail.module').then( m => m.ProfileDetailPageModule),
    canActivate: [AuthenticatedGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
