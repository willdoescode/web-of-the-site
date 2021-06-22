use crate::db;
use juniper::{graphql_value, EmptyMutation, FieldError, FieldResult, IntoFieldError, ScalarValue};
use juniper::{EmptySubscription, RootNode};

#[derive(juniper::GraphQLObject)]
struct Post {
    id: i32,
    name: String,
    body: String,
    date: String,
}

enum CantFindPost {
    CantFindPost,
}

impl<S: ScalarValue> IntoFieldError<S> for CantFindPost {
    fn into_field_error(self) -> FieldError<S> {
        FieldError::new(
            "Cannot find post with that id",
            graphql_value!({"type":"NO_POST"}),
        )
    }
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

    fn post_by_id(post_id: i32) -> FieldResult<Post> {
        use crate::schema::posts::dsl::*;
        use diesel::prelude::*;
        let conn = db::establish_connection();
        let result = posts
            .filter(id.eq(post_id))
            .limit(1)
            .load::<db::Post>(&conn);

        let first = result.as_ref();

        match first {
            Ok(first) => {
                let first = first.first();
                if let Some(p) = first {
                    Ok(Post {
                        id: p.id,
                        name: p.name.to_owned(),
                        body: p.body.to_owned(),
                        date: p.date.to_owned(),
                    })
                } else {
                    Err(CantFindPost::CantFindPost.into_field_error())
                }
            }
            Err(_) => Err(CantFindPost::CantFindPost.into_field_error()),
        }
    }
}

pub type Schema = RootNode<'static, QueryRoot, EmptyMutation, EmptySubscription>;

pub fn create_schema() -> Schema {
    Schema::new(QueryRoot {}, EmptyMutation::new(), EmptySubscription::new())
}
