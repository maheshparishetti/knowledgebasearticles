
import { HomeComponent } from './layout/home/home.component';
import { ContactusComponent } from './layout/contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { Routes,RouterModule } from "@angular/router";
import { AboutusComponent } from './layout/aboutus/aboutus.component';
import { WelcomeComponent } from './layout/welcome/welcome.component';
import { GuardserviceService } from './guardservice.service';
import { PrimecomponentComponent } from './primecomponent/primecomponent.component';
import { TreedataComponent } from './treedata/treedata.component';
import { DevaliComponent } from './devali/devali.component';

const arr: Routes =[
    {path:'',component:WelcomeComponent},
    {path:'home',component:HomeComponent},
    {path:'contactus',canActivate:[GuardserviceService],component:ContactusComponent},
    {path:'aboutus',component:AboutusComponent},
    {path:'login', component:LoginComponent},
    {path:'datatable',component:PrimecomponentComponent},
    {path:'treedata', component:TreedataComponent},
    {path:'deeps',component:DevaliComponent}
];


export const routerModule=RouterModule.forRoot(arr);
