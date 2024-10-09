export default function usernameTranslator(name, soname, username) {
  if ((name === null && soname === null) || (name == "" && soname == ""))
    return username;
  return soname + " " + name;
}
