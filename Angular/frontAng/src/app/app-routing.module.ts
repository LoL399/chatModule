import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserChatComponent } from './admin/user-chat/user-chat.component';
import { UserTableComponent } from './admin/user-table/user-table.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MainPageComponent } from './admin/main-page/main-page.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
const routes: Routes = [
  {path:"", component: SignInComponent },
  {path: "dummy", component: DummyPageComponent},
  {path:"admin", component: MainPageComponent, children:[
    {path:"user", component: UserTableComponent },
    {path: "t/:id", component: UserChatComponent}

  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],




exports: [RouterModule]
})
export class AppRoutingModule { }
