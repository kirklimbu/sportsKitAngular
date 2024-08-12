import { Routes } from "@angular/router";

import { MembersComponent } from "./members.component";
import { MemberEntryComponent } from "./member-entry/member-entry.component";
import { MakePaymentComponent } from "../payment/make-payment.component";
import { AllMembersComponent } from "./all-members.component";
import { hasRoleGuard } from "src/app/shared/util-auth/guards/hasRole.guard";
import { Role } from "src/app/shared/util-auth/models/user.model";
// import { StudyInJapanComponent } from "../study-destinations/study-in-japan/study-in-japan.component";

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


    // {
    //     path: "payment",
    //     component: MakePaymentComponent,
    // },



]