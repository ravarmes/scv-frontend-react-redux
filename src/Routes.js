import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  ArtistaList as ArtistaListView,
  Dashboard as DashboardView,
  BairroList as BairroListView,
  CidadeList as CidadeListView,
  EmprestimoList as EmprestimoListView,
  FilmeList as FilmeListView,
  UFList as UFListView,
  SignIn as SignInView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to={'/dashboard'}
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={ArtistaListView}
        exact
        layout={MainLayout}
        path="/artistas"
      />
      <RouteWithLayout
        component={EmprestimoListView}
        exact
        layout={MainLayout}
        path="/emprestimos"
      />
      <RouteWithLayout
        component={FilmeListView}
        exact
        layout={MainLayout}
        path="/filmes"
      />
      <RouteWithLayout
        component={BairroListView}
        exact
        layout={MainLayout}
        path="/bairros"
      />
      <RouteWithLayout
        component={CidadeListView}
        exact
        layout={MainLayout}
        path="/cidades"
      />
      <RouteWithLayout
        component={UFListView}
        exact
        layout={MainLayout}
        path="/ufs"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <Redirect to="/login" />
    </Switch>
  );
};

export default Routes;