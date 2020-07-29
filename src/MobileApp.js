import React, { Component, createRef } from "react";
import Navbar from "./components/navbar";
import Blog from "./pages/blog";
import Projects from "./pages/projects";
import Home from "./pages/home";
import { Container, Sticky } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { globalContext } from "./components/siteContext";
import MarkdownSection from "./components/markdownSection";
import postData from "./data/post-data.json";

class MobileApp extends Component {
  contextRef = createRef();
  render() {
    const lang = this.context.lang.get;

    return (
      <Router>
        <div ref={this.contextRef}>
          <Sticky context={this.contextRef}>
            <Navbar />
          </Sticky>
          <Container style={{ padding: "1em 0" }}>
            <Switch>
              <Route path="/siyuans-hub/" exact component={Home} />
              <Route path="/siyuans-hub/blog" exact component={Blog} />
              <Route path="/siyuans-hub/projects" exact component={Projects} />
              {/* Posts */}
              {postData.map((post) => {
                return (
                  <Route
                    key={post.title[lang]}
                    exact
                    path={`/siyuans-hub/blog/${post.id}`}
                  >
                    <MarkdownSection filePath={post.path[lang]} lang={lang} />
                  </Route>
                );
              })}
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}
MobileApp.contextType = globalContext;
export default MobileApp;
