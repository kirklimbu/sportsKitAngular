import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { RouterNavigated } from '@ngxs/router-plugin';

export interface UrlStateModel {
  previousUrl: string;
  currentUrl: string;
}

@Injectable()
@State<UrlStateModel>({
  name: 'url',
  defaults: {
    previousUrl: '',
    currentUrl: ''
  }
})
export class UrlState {
  @Selector()
  static previousUrl(state: UrlStateModel) {
    return state.previousUrl;
  }

  @Selector()
  static currentUrl(state: UrlStateModel) {
    return state.currentUrl;
  }

  // @Action(RouterNavigated)
  // handleRouterNavigation(ctx: StateContext<UrlStateModel>, action: RouterNavigated) {
  //   const { previousUrl, url } = action.event;
  //   ctx.patchState({
  //     previousUrl,
  //     currentUrl: url
  //   });
  // }
}
