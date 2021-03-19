import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HubService } from 'ngx-signalr-hubservice'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserTableComponent } from './admin/user-table/user-table.component';
import { UserChatComponent } from './admin/user-chat/user-chat.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ChatAreaComponent } from './chat/chat-area/chat-area.component';
import { MyChatComponent } from './chat/my-chat/my-chat.component';
import { YourChatComponent } from './chat/your-chat/your-chat.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MainPageComponent } from './admin/main-page/main-page.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    UserChatComponent,
    SideBarComponent,
    ChatAreaComponent,
    MyChatComponent,
    YourChatComponent,
    SignInComponent,
    MainPageComponent,
    DummyPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
