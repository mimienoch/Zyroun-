import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)

ASSETS = {
    "icon-check.svg": "https://www.figma.com/api/mcp/asset/5c4dcc2c-0344-4fa4-8c57-34ea26159a4c.svg",
    "icon-send.svg": "https://www.figma.com/api/mcp/asset/9411f243-a89f-4053-a260-cacd033ba60f.svg",
    "logo-mark.svg": "https://www.figma.com/api/mcp/asset/17034119-72ba-46b8-a977-291402e5ceaa.svg",
    "category-uiux.png": "https://www.figma.com/api/mcp/asset/97d4f13c-2f41-4b0b-bfa1-6b2bb5ee2076.png",
    "category-branding.png": "https://www.figma.com/api/mcp/asset/1814fed6-246e-48b4-ae89-a9def077d7ef.png",
    "category-web.png": "https://www.figma.com/api/mcp/asset/2e650a5a-f073-43d7-a57c-020d9d3358d9.png",
    "designer-cover.png": "https://www.figma.com/api/mcp/asset/aec93e44-02da-43ba-a80d-88278de1ed73.png",
    "avatar-elena.png": "https://www.figma.com/api/mcp/asset/8f5b6d76-267a-4421-9cd4-a83380f923e3.png",
    "avatar-sarah.png": "https://www.figma.com/api/mcp/asset/31cd9e63-5e84-4ac6-ab99-e5a9e36e1432.png",
    "avatar-michael.png": "https://www.figma.com/api/mcp/asset/9877258f-ff74-427c-9fbd-5966b6240e60.png",
    "avatar-emma.png": "https://www.figma.com/api/mcp/asset/82751bb4-1820-42ad-a803-5b8267bfb87b.png",
    "icon-layers.svg": "https://www.figma.com/api/mcp/asset/191f46c9-d87e-496f-b988-eb53217c70aa.svg",
    "icon-chevron-down.svg": "https://www.figma.com/api/mcp/asset/43b721a9-a302-404a-ba98-cade8ecc4731.svg",
    "icon-search.svg": "https://www.figma.com/api/mcp/asset/eba548fa-6af0-4c98-a787-086d1de642e9.svg",
    "icon-process.svg": "https://www.figma.com/api/mcp/asset/d465692d-8b32-4e67-be64-c6b0d4f78d17.svg",
    "icon-pen.svg": "https://www.figma.com/api/mcp/asset/c17415a1-f320-4bcf-a3f2-73262b27a2b1.svg",
    "icon-concepts.svg": "https://www.figma.com/api/mcp/asset/3d945206-96b9-4ac5-88b8-0cec4130b7ab.svg",
    "icon-winner.svg": "https://www.figma.com/api/mcp/asset/c9d0132f-234e-4ee9-adda-64491c2bc08e.svg",
    "icon-designers.svg": "https://www.figma.com/api/mcp/asset/dff483f1-433f-40e8-b6fd-78130272625f.svg",
    "icon-layers-more.svg": "https://www.figma.com/api/mcp/asset/d56ca00b-9791-42d7-a21a-ac4d4170de78.svg",
    "icon-star.svg": "https://www.figma.com/api/mcp/asset/4b3a95a3-bbd6-4d27-aa64-04cd8b46cdba.svg",
    "icon-agency.svg": "https://www.figma.com/api/mcp/asset/6ad8fdc2-5308-4c2a-88b3-5a4a2bd46da5.svg",
    "icon-x.svg": "https://www.figma.com/api/mcp/asset/c5f09a90-ae6b-4004-b168-ef6acb5dfd0b.svg",
    "icon-crown.svg": "https://www.figma.com/api/mcp/asset/f6f90e26-d595-424d-900c-19169dabab5d.svg",
    "icon-check-teal.svg": "https://www.figma.com/api/mcp/asset/da160e14-aca6-43fa-abba-cb5fd94a4f74.svg",
    "icon-freelance.svg": "https://www.figma.com/api/mcp/asset/f7bc19d9-cb36-41d8-b4b5-aa86ea67f234.svg",
    "icon-x-muted.svg": "https://www.figma.com/api/mcp/asset/2c341617-0e60-470d-b4e8-66adc6473ba7.svg",
    "star-t1-1.svg": "https://www.figma.com/api/mcp/asset/c94931d9-f810-4298-83a5-663411a9cb88.svg",
    "star-t1-2.svg": "https://www.figma.com/api/mcp/asset/e9bef10d-c7b7-4146-9ee1-991d4b816148.svg",
    "star-t1-3.svg": "https://www.figma.com/api/mcp/asset/c540ea90-6d11-42f0-a2c8-fb638c71b685.svg",
    "star-t1-4.svg": "https://www.figma.com/api/mcp/asset/9545877e-dbda-4611-9345-904e3bd57324.svg",
    "star-t1-5.svg": "https://www.figma.com/api/mcp/asset/ed6af329-7816-4a4a-8547-f703b27abe78.svg",
    "star-t2.svg": "https://www.figma.com/api/mcp/asset/b2060378-2b3b-4ae9-81aa-ca0dc0acfacd.svg",
    "star-t3-1.svg": "https://www.figma.com/api/mcp/asset/26915bb7-76c4-4b74-a377-864be8fdea91.svg",
    "star-t3-2.svg": "https://www.figma.com/api/mcp/asset/7e53bb04-af8f-46e8-8e67-a35016c954cd.svg",
    "star-t3-3.svg": "https://www.figma.com/api/mcp/asset/0f56b512-cb0f-4898-9b79-d34b444b88b5.svg",
    "star-t3-4.svg": "https://www.figma.com/api/mcp/asset/2dfd7360-ffb9-47f3-8d21-252f74680eae.svg",
    "star-t3-5.svg": "https://www.figma.com/api/mcp/asset/4b4ba07a-8e0a-4cc2-8788-b6c9600dfb8b.svg",
    "logo-mark-white.svg": "https://www.figma.com/api/mcp/asset/0b2a14ad-b65c-41e9-9e17-3408612b6c32.svg",
    "icon-social-1.svg": "https://www.figma.com/api/mcp/asset/c7f0c985-19de-4dcc-8bbb-17aa9167be16.svg",
    "icon-social-2.svg": "https://www.figma.com/api/mcp/asset/f4aa1839-8311-4024-9834-7b6d2158753e.svg",
    "icon-social-3.svg": "https://www.figma.com/api/mcp/asset/18cb804d-6068-4a1e-b3aa-191a4d9623ff.svg",
}


def fetch(item: tuple[str, str]) -> str:
    filename, url = item
    dest = OUT / filename
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp, open(dest, "wb") as handle:
        handle.write(resp.read())
    return f"{filename} {dest.stat().st_size}"


if __name__ == "__main__":
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(fetch, item) for item in ASSETS.items()]
        for future in as_completed(futures):
            print(future.result(), flush=True)
    print("done", len(ASSETS), flush=True)
