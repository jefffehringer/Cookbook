import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./pages/recipe/recipe-list/recipe-list.module').then( m => m.RecipeListPageModule)
  },
  {
    path: 'recipes/create',
    loadChildren: () => import('./pages/recipe/recipe-create/recipe-create.module').then( m => m.RecipeCreatePageModule)
  },
  {
    path: 'recipes/:id',
    loadChildren: () => import('./pages/recipe/recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule)
  },
  {
    path: 'recipes/:id/edit',
    loadChildren: () => import('./pages/recipe/recipe-edit/recipe-edit.module').then( m => m.RecipeEditPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
