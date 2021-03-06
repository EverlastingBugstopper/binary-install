use assert_cmd::Command;

#[test]
fn it_cannot_c() {
    get_bin()
        .assert()
        .stderr(predicates::str::contains("didn't"))
        .success();
}

#[test]
fn it_can_c_four() {
    get_bin()
        .arg("-cccc")
        .assert()
        .stdout(predicates::str::contains("4"))
        .success();
}

fn get_bin() -> Command {
    Command::cargo_bin(env!("CARGO_PKG_NAME")).unwrap()
}
