#[macro_use]
extern crate diesel;

use std::sync::Arc;

use actix_cors::Cors;
use actix_web::{middleware, web, App, Error, HttpResponse, HttpServer};
use juniper::http::GraphQLRequest;

mod db;
mod graphql;
mod schema;

use crate::graphql::{create_schema, Schema};

async fn graphiql() -> HttpResponse {
    let html = String::from_utf8(include_bytes!("playground.html").to_vec()).unwrap();

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}

async fn graphql_handler(
    st: web::Data<Arc<Schema>>,
    data: web::Json<GraphQLRequest>,
) -> Result<HttpResponse, Error> {
    let user = web::block(move || {
        let res = data.execute_sync(&st, &());
        Ok::<_, serde_json::error::Error>(serde_json::to_string(&res)?)
    })
    .await?;
    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(user))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    let url = std::env::var("URL").unwrap_or("localhost".into());
    let port = std::env::var("PORT").unwrap_or("8080".into());
    let schema = Arc::new(create_schema());

    HttpServer::new(move || {
        App::new()
            .data(schema.clone())
            .wrap(middleware::Logger::default())
            .wrap(
                Cors::default()
                    .allow_any_header()
                    .allow_any_method()
                    .allow_any_origin(),
            )
            .service(web::resource("/graphql").route(web::post().to(graphql_handler)))
            .service(web::resource("/graphiql").route(web::get().to(graphiql)))
    })
    .bind((url, port.parse().unwrap()))?
    .run()
    .await
}
