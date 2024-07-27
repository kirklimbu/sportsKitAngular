import { Routes } from "@angular/router";
import { EventsComponent } from "./events.component";
import { TotalEventsComponent } from "./total-events/total-events.component";
// import { StudyInJapanComponent } from "../study-destinations/study-in-japan/study-in-japan.component";

export const FEATURE_EVENTS_ROUTES: Routes = [
    {
        path: "",
        component: EventsComponent,
    },
    {
        path: "all-events",
        component: TotalEventsComponent,
    },


]