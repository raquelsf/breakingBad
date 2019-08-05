export interface RequestBuilder {
  path: string;
  query: object;
  headers: object;
  useAuthorization: boolean;
  loadingInfoMode: ( 'circle' | 'loading_bar' | 'fullscreen' | 'none' );
}
