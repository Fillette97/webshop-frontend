import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [AdminPanelComponent],
    imports: [
        CommonModule,
        MatIconModule
    ]
})
export class AdminModule { }
