use js_sys::Date;
use lazy_static::lazy_static;
use wasm_bindgen::{prelude::*, JsCast};

use std::{collections::HashMap, sync::Mutex};

use crate::muddle_types::HashableObject;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
}

pub fn muddle_log(s: &str) {
    log(&format!("rust_common: {}", &s));
}

pub fn hash_id(object: &impl JsCast) -> String {
    let object: &HashableObject = object.unchecked_ref();
    object.hashable_id_interface().get_hash_id()
}

macro_rules! muddle_panic {
    ($($t:tt)*) => {
        (muddle_log(&format_args!($($t)*).to_string()));
        panic!();
    }
}

#[allow(unused_macros)]
macro_rules! muddle_log {
    ($($t:tt)*) => (muddle_log(&format_args!($($t)*).to_string()))
}

#[allow(unused_macros)]
macro_rules! muddle_timed_log_hashable {
    ($hashable:expr, $label:expr, $secs:expr, $($t:tt)*) => (muddle_timed_log!(
        &format!("{}_{}", hash_id($hashable), $label),
        $secs,
        $($t)*,
    ))
}

#[allow(unused_macros)]
macro_rules! muddle_timed_log {
    ($label:expr, $secs:expr, $($t:tt)*) => {
        muddle_timed_log(
            &format_args!($($t)*).to_string(),
            $label,
            f64::from($secs),
        );
    }
}

struct TimedLogEntry {
    last_logged: f64,
    time_period: f64,
}

lazy_static! {
    static ref TIMED_LOGS: Mutex<HashMap<String, TimedLogEntry>> = Mutex::new(HashMap::new());
}

pub fn muddle_timed_log(s: &str, label: &str, time_period: f64) {
    let now = Date::now() as f64 * 1e-3;
    let timed_logs = &mut *TIMED_LOGS.lock().unwrap();
    timed_logs.retain(|_, entry| {
        let elapsed_secs = now - entry.last_logged;
        elapsed_secs < entry.time_period
    });
    let last_entry = timed_logs.get(label);
    match last_entry {
        Some(TimedLogEntry { last_logged, .. }) => {
            let elapsed_secs = now - last_logged;
            if elapsed_secs > time_period {
                timed_logs.insert(
                    label.into(),
                    TimedLogEntry {
                        last_logged: now,
                        time_period,
                    },
                );
                muddle_log(s);
            }
        }
        None => {
            timed_logs.insert(
                label.into(),
                TimedLogEntry {
                    last_logged: now,
                    time_period,
                },
            );
            muddle_log(s);
        }
    }
}
