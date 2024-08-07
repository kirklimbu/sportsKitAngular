import { Routes } from "@angular/router";
import { MakePaymentComponent } from "./make-payment.component";
import { PaymentHistoryComponent } from "./payment-history/payment-history.component";
import { hasRoleGuard } from "src/app/shared/util-auth/guards/hasRole.guard";
import { Role } from "src/app/shared/util-auth/models/user.model";

export const FEATURE_PAYMENT_ROUTES: Routes = [


    {
        canActivate: [hasRoleGuard],
        data: {
            roles: [Role.ADMIN],
        },
        path: "",
        component: MakePaymentComponent,
    },
    {
        canActivate: [hasRoleGuard],
        data: {
            roles: [Role.ADMIN, Role.USER],
        },
        path: "history",
        component: PaymentHistoryComponent,
    },




]