use wasm_bindgen::{JsCast, JsValue};

pub fn object_debug(object: &impl JsCast) -> String {
    let _value: &JsValue = object.unchecked_ref();
    String::new()
}
