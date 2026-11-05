import json

p = r"C:\Users\DELL\.cursor\projects\c-Users-DELL-OneDrive-Documents-Coding-Projects\agent-tools\e7f96a1e-57f9-4828-a70a-c42d154d8b57.txt"
nodes = json.loads(open(p, encoding="utf-8").read())


def walk(n, fn, d=0):
    fn(n, d)
    for c in n.get("children") or []:
        walk(c, fn, d + 1)


print("TOP LEVEL:")
for n in nodes:
    b = n.get("bounds") or {}
    print(f"- {n['id']} {n['type']} {n['name']!r} {int(b.get('width',0))}x{int(b.get('height',0))}")


def dump_set(target_name):
    found = []

    def fn(n, d):
        if n.get("type") == "COMPONENT_SET" and target_name.lower() in n.get("name", "").lower():
            found.append(n)

    for n in nodes:
        walk(n, fn)
    for s in found:
        b = s.get("bounds") or {}
        print("\nSET", s["id"], s["name"], int(b.get("width", 0)), "x", int(b.get("height", 0)))
        kids = s.get("children") or []
        print(" variants", len(kids))
        for c in kids:
            if c.get("type") == "COMPONENT":
                print("  ", c["id"], c["name"], int((c.get("bounds") or {}).get("width", 0)), "x", int((c.get("bounds") or {}).get("height", 0)))


for name in ["Primary Button", "Input", "Search Bar", "Tag", "Status", "DropDown", "Menu Item", "Menu", "Snack Bar", "Navigation Bar", "Rating", "Switch", "Avatar", "Avatar Group", "Badge", "Settings", "FAQ", "Article"]:
    dump_set(name)
