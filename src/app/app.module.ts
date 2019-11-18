import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  NgbModule,
  NgbPaginationModule,
  NgbAlertModule
} from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./AppComponent";
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./layout/home/home.component";
import { ContactusComponent } from "./layout/contactus/contactus.component";
import { LoginComponent } from "./login/login.component";
// import { NgbdModalBasic } from '@angular/modal-basic';
import { HttpClientModule } from "@angular/common/http";
import { routerModule } from "./app.routing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { SidebarModule } from "primeng/sidebar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AboutusComponent } from "./layout/aboutus/aboutus.component";
import { WelcomeComponent } from "./layout/welcome/welcome.component";
import { Custom } from "./custom.pipe";
import {TableModule} from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { PrimecomponentComponent } from './primecomponent/primecomponent.component';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { TreedataComponent } from './treedata/treedata.component';
import {TreeTableModule} from 'primeng/treetable';
import {MultiSelectModule} from 'primeng/multiselect';


import { NodeService } from './node.service';
import { DevaliComponent } from './devali/devali.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,

    ContactusComponent,

    LoginComponent,

    SidebarComponent,

    FooterComponent,

    AboutusComponent,

    WelcomeComponent,
    Custom,
    PrimecomponentComponent,
    TreedataComponent,
    DevaliComponent,

  ],
  imports: [
    BrowserModule,
    routerModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule,
    BrowserAnimationsModule,
    FormsModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    TableModule,
    ToastModule,
    DataViewModule,
    DropdownModule,
    MultiSelectModule,

    PanelModule,
    VirtualScrollerModule,
    TreeTableModule
  ],
  providers: [MessageService,NodeService],
  bootstrap: [AppComponent]
  // declarations: [NgbdModalBasic],
})
export class AppModule {}
