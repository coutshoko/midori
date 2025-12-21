# Phone Access Troubleshooting

## Issue: Can access from laptop but not phone

### Quick Fixes:

**1. Clear DNS cache on phone:**

**iPhone:**
- Settings → Wi-Fi → Tap (i) next to your network → Configure DNS → Manual
- Change DNS servers to: `8.8.8.8` and `8.8.4.4` (Google DNS)
- Or toggle Wi-Fi off/on to refresh DNS cache

**Android:**
- Settings → Network & Internet → Wi-Fi → Long press your network → Modify network → Advanced → IP settings → Static
- DNS 1: `8.8.8.8`
- DNS 2: `8.8.4.4`
- Or Settings → Apps → Chrome → Storage → Clear Cache

**2. Try different network:**
- Switch from WiFi to mobile data (or vice versa)
- Try a different WiFi network

**3. Check DNS propagation:**
```bash
# From your laptop, check if DNS resolves correctly
nslookup chatboard.coutshoko.dev
dig chatboard.coutshoko.dev

# Check what IP your phone is resolving to
# Use a DNS checker website: https://dnschecker.org/
```

**4. Clear browser cache on phone:**
- Chrome: Settings → Privacy → Clear browsing data
- Safari: Settings → Safari → Clear History and Website Data

**5. Try incognito/private mode:**
- This bypasses cache and cookies

**6. Check SSL certificate:**
- Phone browsers are stricter about SSL certificates
- Make sure the certificate includes chatboard.coutshoko.dev
- Try accessing via IP first to rule out DNS issues

**7. Check firewall/security settings:**
- Some phones have stricter security settings
- Check if VPN or security apps are blocking it

## Common Causes:

1. **DNS Cache** - Phone cached old DNS record (most common)
2. **Different DNS Servers** - Phone using different DNS than laptop
3. **Network Differences** - Phone on different network (WiFi vs mobile)
4. **Browser Cache** - Phone browser cached error page
5. **SSL Certificate** - Phone browser rejecting certificate

## Debug Steps:

1. Try accessing from phone's browser in incognito mode
2. Try accessing from phone using mobile data instead of WiFi
3. Check if other subdomains work (murakami.coutshoko.dev, tarkov.coutshoko.dev)
4. Try accessing via IP address: `https://YOUR_VPS_IP` (if you have a way to route it)

