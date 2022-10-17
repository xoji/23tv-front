import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/app/app";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/theme";

import { LangProvider } from "./context/lanuage";
import { ResulutionContext } from "./context/resolution";
import { ShareLinkProvider } from "./context/shareLink";
import { LoginProvider } from "./context/login";
import { AuthorizetionProvider } from "./context/user";
import { FilterProvider } from "./context/filter";
import { PaginationProvider } from "./context/pagination";
import {SrcContext} from "./context/srcContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SrcContext>
          <ThemeProvider>
              <LangProvider>
                  <ResulutionContext>
                      <ShareLinkProvider>
                          <LoginProvider>
                              <AuthorizetionProvider>
                                  <FilterProvider>
                                      <PaginationProvider>
                                          <App />
                                      </PaginationProvider>
                                  </FilterProvider>
                              </AuthorizetionProvider>
                          </LoginProvider>
                      </ShareLinkProvider>
                  </ResulutionContext>
              </LangProvider>
          </ThemeProvider>
      </SrcContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
