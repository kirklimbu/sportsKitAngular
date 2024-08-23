import { Routes } from "@angular/router";
import { MemberEntryComponent } from "./member-entry/member-entry.component";
import { AllMembersComponent } from "./all-members.component";
import { TotalMembersComponent } from "./total-members/total-members.component";

export const FEATURE_MEMBERS_ROUTES: Routes = [
    // {
    //     path: "",
    //     component: MembersComponent,
    // },
    {

        path: "add-member",
        component: MemberEntryComponent,
    },
    {

        path: "list-member",
        component: AllMembersComponent,
    },


]