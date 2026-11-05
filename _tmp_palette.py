import json

p = r"C:\Users\DELL\.cursor\projects\c-Users-DELL-OneDrive-Documents-Coding-Projects\agent-tools\e7f96a1e-57f9-4828-a70a-c42d154d8b57.txt"
nodes = json.loads(open(p, encoding="utf-8").read())


def walk(n, fn):
    fn(n)
    for c in n.get("children") or []:
        walk(c, fn)


palette = next(n for n in nodes if n["id"] == "261:344")


def dump_text_and_fills(n, d=0):
    b = n.get("bounds") or {}
    styles = n.get("styles") or {}
    fills = styles.get("fills")
    chars = n.get("characters")
    if chars or (fills and n.get("type") in ("FRAME", "RECTANGLE", "ELLIPSE", "TEXT")):
        extra = ""
        if chars:
            extra += " T=" + repr(chars)[:60]
        if fills:
            extra += " F=" + str(fills)[:140]
        print(("  " * min(d, 6)) + f"{n.get('type')} {n.get('name')!r} {int(b.get('width',0))}x{int(b.get('height',0))}{extra}")
    if d < 5:
        for c in n.get("children") or []:
            dump_text_and_fills(c, d + 1)


dump_text_and_fills(palette)


def dump_comp(nid):
    found = []

    def fn(n):
        if n.get("id") == nid:
            found.append(n)

    for n in nodes:
        walk(n, fn)
    if not found:
        print("NOT FOUND", nid)
        return
    n = found[0]
    styles = n.get("styles") or {}
    print("\n===", n["id"], n["name"], "===")
    print("type", n["type"], "bounds", n.get("bounds"))
    print("al", styles.get("autoLayout"))
    print("pad", styles.get("padding"))
    print("fills", styles.get("fills"))
    print("strokes", styles.get("strokes"), "sw", styles.get("strokeWeight"))
    print("cr", styles.get("cornerRadius"))
    print("effects", styles.get("effects"))
    for c in n.get("children") or []:
        cs = c.get("styles") or {}
        print(" child", c.get("type"), c.get("name"), c.get("characters"), "fills", cs.get("fills"), "font", cs.get("fontSize"), cs.get("fontFamily"), cs.get("fontWeight"), cs.get("lineHeight"))


for nid in [
    "244:1684",
    "254:565",
    "254:709",
    "254:421",
    "249:627",
    "254:557",
    "254:569",
    "254:545",
    "250:100",
    "254:782",
    "255:308",
    "255:397",
    "256:439",
    "256:495",
    "254:824",
    "254:841",
    "274:457",
    "274:459",
    "324:1367",
    "324:1362",
    "324:1310",
    "324:1312",
    "326:1540",
    "326:1547",
    "326:1551",
    "405:2127",
    "405:2129",
    "405:2131",
    "406:2133",
    "367:3002",
    "365:2925",
    "365:2842",
    "399:1883",
    "399:1894",
    "440:1871",
    "279:1347",
    "279:1349",
    "314:1154",
]:
    dump_comp(nid)
