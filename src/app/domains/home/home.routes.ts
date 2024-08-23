import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { TotalMembersComponent } from "../members/total-members/total-members.component";
import { TotalEventsComponent } from "../events/total-events/total-events.component";
import { EventDetailsComponent } from "../events/event-details.component";
import { TrainingComponent } from "../training/training.component";
// import { StudyInJapanComponent } from "../study-destinations/study-in-japan/study-in-japan.component";

export const FEATURE_HOME_ROUTES: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
    {

        path: "all-member",
        component: TotalMembersComponent,
    },

    {
        path: 'events',
        data: {
            breadcrumb: 'events'
        },
        component: TotalEventsComponent,
    },
    {
        path: 'events/detail',
        data: {
            breadcrumb: 'events'
        },
        component: EventDetailsComponent,
    },
    {
        path: 'training',
        data: {
            breadcrumb: 'training'
        },
        component: TrainingComponent,
    },


]