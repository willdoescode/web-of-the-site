use crate::db;
use juniper::{EmptyMutation, FieldResult};
use juniper::{EmptySubscription, RootNode};

#[derive(juniper::GraphQLObject)]
struct Post {
    id: i32,
    name: String,
    body: String,
    date: String,
}

pub struct QueryRoot;

#[juniper::graphql_object]
impl QueryRoot {
    fn all_posts() -> FieldResult<Vec<Post>> {
        use crate::schema::posts::dsl::*;
        use diesel::prelude::*;
        let conn = db::establish_connection();
        let results: Vec<crate::db::Post> = posts.load(&conn).unwrap();

        Ok(results
            .iter()
            .map(|p| Post {
                id: p.id,
                name: p.name.to_owned(),
                body: p.body.to_owned(),
                date: p.date.to_owned(),
            })
            .collect())
    }

    // fn post_by_name(name: String) -> FieldResult<Post> {
    //     Ok(Post {
    //         name,
    //         body: "swag".to_string(),
    //         date: "no".to_string(),
    //     })
    // }
}

pub type Schema = RootNode<'static, QueryRoot, EmptyMutation, EmptySubscription>;

pub fn create_schema() -> Schema {
    Schema::new(QueryRoot {}, EmptyMutation::new(), EmptySubscription::new())
}
