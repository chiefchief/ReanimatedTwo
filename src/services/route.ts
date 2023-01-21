import {createNavigationContainerRef, NavigationState, PartialState} from '@react-navigation/native';
import {StackActions} from '@react-navigation/routers';

export let currentRouteName: string = '';

export const navigationRef = createNavigationContainerRef();
export const onStateChange: TOnStateChange = state => {
  currentRouteName = parseRoute(state);
};

export function navigate(name: string, params?: any) {
  navigationRef?.current?.navigate(name as never, params as never);
}
export function goBack() {
  navigationRef?.current?.goBack();
}
export function reset(name: string, params?: any) {
  navigationRef?.current?.reset({routes: [{name, params}]});
}
export function push(name: string, params?: any) {
  navigationRef?.current?.dispatch(StackActions.push(name, params));
}
export function pop() {
  navigationRef?.current?.dispatch(StackActions.pop());
}
export function popToTop() {
  navigationRef?.current?.dispatch(StackActions.popToTop());
}

export const parseRoute: TParseRoute = initialState => {
  const state = initialState?.routes[0]?.state || undefined;
  const name = initialState?.routes[0]?.name || 'No Screen Name';
  if (state) {
    return parseRoute(state);
  }

  return name;
};

type TOnStateChange = ((state: NavigationState | undefined) => void) | undefined;
type TParseRoute = (state: NavigationState | PartialState<NavigationState> | undefined) => string;
