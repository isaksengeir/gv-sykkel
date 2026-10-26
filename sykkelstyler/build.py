# Setter sammen src (shell.html + i18n.js + app.js) og bygger inn HDRI-en som base64, til én fil
import base64,sys
from pathlib import Path
d=Path(__file__).parent
src=d/'src' if (d/'src').exists() else d
s=(src/'shell.html').read_text(encoding='utf-8');a=(src/'app.js').read_text(encoding='utf-8')
s=s.replace('/*I18N*/',(src/'i18n.js').read_text(encoding='utf-8'))
h=base64.b64encode((d/'assets/studio_small_03_1k.hdr').read_bytes()).decode()
a=a.replace('__HDR_B64__',h)
t=d/'assets/rt_ldr_calb_cnrm.tza'
if t.exists():a=a.replace('__TZA_B64__',base64.b64encode(t.read_bytes()).decode())
out=d/(sys.argv[1] if len(sys.argv)>1 else 'index.html')
out.write_text(s.replace('/*APP*/',a),encoding='utf-8');print(out.name,'oppdatert',round(out.stat().st_size/1e6,2),'MB')
