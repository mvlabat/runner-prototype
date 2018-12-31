use nalgebra;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(module = "../../../common/Interfaces/HashableIdInterface")]
extern "C" {
    #[wasm_bindgen(js_name = default)]
    pub type HashableIdInterface;

    #[wasm_bindgen(method, js_name = getHashId)]
    pub fn get_hash_id(this: &HashableIdInterface) -> String;
}

#[wasm_bindgen(module = "../../../common/Interfaces/PlaceableObjectInterface")]
extern "C" {
    #[wasm_bindgen(js_name = default)]
    pub type PlaceableObjectInterface;

    #[wasm_bindgen(method, js_name = getPosition)]
    pub fn get_position(this: &PlaceableObjectInterface) -> ThreeVector2;

    #[wasm_bindgen(method, js_name = setPosition)]
    pub fn set_position(this: &PlaceableObjectInterface, position: ThreeVector2);
}

#[wasm_bindgen(module = "../../../common/PlaceableObjects/Circle")]
extern "C" {
    #[wasm_bindgen(js_name = default)]
    pub type Circle;

    #[wasm_bindgen(method, getter = hashableIdInterface)]
    pub fn hashable_id_interface(this: &Circle) -> HashableIdInterface;

    #[wasm_bindgen(method, getter = placeableObjectInterface)]
    pub fn placeable_object_interface(this: &Circle) -> PlaceableObjectInterface;

    #[wasm_bindgen(method, js_name = getRadius)]
    pub fn get_radius(this: &Circle) -> f64;
}

#[wasm_bindgen(module = "../../../common/PlaceableObjects/Player")]
extern "C" {
    #[wasm_bindgen(js_name = default)]
    pub type Player;

    #[wasm_bindgen(method, getter = hashableIdInterface)]
    pub fn hashable_id_interface(this: &Player) -> HashableIdInterface;

    #[wasm_bindgen(method, getter = placeableObjectInterface)]
    pub fn placeable_object_interface(this: &Player) -> PlaceableObjectInterface;

    #[wasm_bindgen(method, js_name = getRadius)]
    pub fn get_radius(this: &Player) -> f64;

    #[wasm_bindgen(method, getter = movementDirection)]
    pub fn get_movement_direction(this: &Player) -> ThreeVector2;
}

#[wasm_bindgen(module = "../../../common/PlaceableObjects/Rectangle")]
extern "C" {
    #[wasm_bindgen(js_name = default)]
    pub type Rectangle;

    #[wasm_bindgen(method, getter = hashableIdInterface)]
    pub fn hashable_id_interface(this: &Rectangle) -> HashableIdInterface;

    #[wasm_bindgen(method, getter = placeableObjectInterface)]
    pub fn placeable_object_interface(this: &Rectangle) -> PlaceableObjectInterface;

    #[wasm_bindgen(method, js_name = getSize)]
    pub fn get_size(this: &Rectangle) -> ThreeVector2;
}

#[wasm_bindgen]
extern "C" {
    pub type HashableObject;

    #[wasm_bindgen(structural, method, getter = hashableIdInterface)]
    pub fn hashable_id_interface(this: &HashableObject) -> HashableIdInterface;
}

#[wasm_bindgen]
extern "C" {
    pub type PlaceableObject;

    #[wasm_bindgen(structural, method, getter = hashableIdInterface)]
    pub fn hashable_id_interface(this: &PlaceableObject) -> HashableIdInterface;

    #[wasm_bindgen(structural, method, getter = placeableObjectInterface)]
    pub fn placeable_object_interface(this: &PlaceableObject) -> PlaceableObjectInterface;
}

#[wasm_bindgen(module = "three")]
extern "C" {
    #[wasm_bindgen(js_name = Vector2)]
    pub type ThreeVector2;

    #[wasm_bindgen(constructor, js_class = Vector2)]
    pub fn new(x: f64, y: f64) -> ThreeVector2;

    #[wasm_bindgen(method, getter)]
    pub fn x(this: &ThreeVector2) -> f64;

    #[wasm_bindgen(method, setter)]
    pub fn set_x(this: &ThreeVector2, val: f64);

    #[wasm_bindgen(method, getter)]
    pub fn y(this: &ThreeVector2) -> f64;

    #[wasm_bindgen(method, setter)]
    pub fn set_y(this: &ThreeVector2, val: f64);
}

impl From<nalgebra::Vector2<f64>> for ThreeVector2 {
    fn from(vector: nalgebra::Vector2<f64>) -> Self {
        ThreeVector2::new(vector.x, vector.y)
    }
}

impl Into<nalgebra::Vector2<f64>> for ThreeVector2 {
    fn into(self) -> nalgebra::Vector2<f64> {
        nalgebra::Vector2::new(self.x(), self.y())
    }
}
