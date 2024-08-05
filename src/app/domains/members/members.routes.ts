import { Routes } from "@angular/router";

import { MembersComponent } from "./members.component";
import { MemberEntryComponent } from "./member-entry/member-entry.component";
import { MakePaymentComponent } from "./payment/make-payment.component";
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
        path: "payment",
        component: MakePaymentComponent,
    },



]