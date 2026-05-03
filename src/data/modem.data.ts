import type { RouterState } from '../types/modem';

export const modemState: RouterState = {
  system: {
    model: { manufacturer: 'KONNECT', model: 'KT-3535n', hardware: '1.0', serial: 'A1B2C3D4E5F6' },
    firmware: {
      currentVersion: '3.0.0.4.388.24198',
      latestVersion:  '3.0.0.4.390.10020',
      buildDate:      '2024-11-15',
      updateAvailable:   true,
      autoUpdateEnabled: false,
    },
    resources: {
      cpuPercent:         18,
      memoryPercent:      42,
      memoryTotalMb:      512,
      memoryUsedMb:       215,
      flashTotalMb:       128,
      flashUsedMb:        87,
      temperatureCelsius: 52,
    },
    time: {
      current:       '2026-05-02T14:30:00+03:00',
      timezone:      'Europe/Istanbul',
      ntpServer:     'pool.ntp.org',
      ntpEnabled:    true,
      uptimeSeconds: 1_209_600, // 14 days
    },
    hostname:  'KONNECT-KT-3535n',
    wanMac:    'AA:BB:CC:DD:EE:01',
    lanMac:    'AA:BB:CC:DD:EE:02',
    wifiMac24: 'AA:BB:CC:DD:EE:03',
    wifiMac5:  'AA:BB:CC:DD:EE:04',
    wifiMac6:  null,
  },

  wan: {
    connectionType: 'PPPOE',
    status:         'CONNECTED',
    ipAddress:      '88.247.123.45',
    subnetMask:     '255.255.255.0',
    gateway:        '88.247.123.1',
    dnsPrimary:     '8.8.8.8',
    dnsSecondary:   '8.8.4.4',
    ipv6Address:    '2a02:4780:dead:beef::1',
    mtu:            1492,
    uplinkMbps:     100,
    downlinkMbps:   500,
    connectedSince: '2026-04-18T08:12:00+03:00',
    pppoe: {
      username:         'user@isp.net',
      password:         '••••••••',
      serviceName:      '',
      mtu:              1492,
      connectOnDemand:  false,
      maxIdleMinutes:   null,
    },
    static: null,
  },

  lan: {
    ipAddress:   '192.168.1.1',
    subnetMask:  '255.255.255.0',
    ipv6Enabled: true,
    dhcp: {
      enabled:     true,
      poolStart:   '192.168.1.100',
      poolEnd:     '192.168.1.200',
      subnetMask:  '255.255.255.0',
      gateway:     '192.168.1.1',
      dnsPrimary:  '192.168.1.1',
      dnsSecondary: '8.8.8.8',
      leaseHours:  24,
      staticBindings: [
        { id: 'sb-1', mac: '00:11:22:33:44:55', ip: '192.168.1.10', hostname: 'desktop-pc' },
        { id: 'sb-2', mac: '00:11:22:33:44:66', ip: '192.168.1.11', hostname: 'nas-server' },
      ],
    },
  },

  wifi: {
    radios: [
      {
        band: '2.4GHz', standard: '802.11b/g/n', enabled: true,
        channel: 6, channelWidth: '40MHz', txPowerPercent: 100,
        beamforming: false, mu_mimo: true, ofdma: false,
      },
      {
        band: '5GHz', standard: '802.11ax', enabled: true,
        channel: 36, channelWidth: '80MHz', txPowerPercent: 100,
        beamforming: true, mu_mimo: true, ofdma: true,
      },
    ],
    networks: [
      {
        id: 'net-1', band: '2.4GHz', ssid: 'HomeNetwork', hidden: false,
        securityMode: 'WPA2_WPA3_MIXED', password: 'MySecurePass123',
        vlanId: null, isGuest: false, guestIsolate: false,
        maxClients: null, enabled: true, schedule: null,
      },
      {
        id: 'net-2', band: '5GHz', ssid: 'HomeNetwork_5G', hidden: false,
        securityMode: 'WPA3_PERSONAL', password: 'MySecurePass123',
        vlanId: null, isGuest: false, guestIsolate: false,
        maxClients: null, enabled: true, schedule: null,
      },
      {
        id: 'net-3', band: '2.4GHz', ssid: 'HomeGuest', hidden: false,
        securityMode: 'WPA2_PERSONAL', password: 'GuestPass456',
        vlanId: 10, isGuest: true, guestIsolate: true,
        maxClients: 10, enabled: true, schedule: null,
      },
    ],
    wps:     { enabled: false, pin: '12345670' },
    roaming: {
      enabled: true,
      threshold80211r: true, threshold80211k: true, threshold80211v: true,
      rssiThreshold: -70,
    },
  },

  connectedDevices: [
    {
      id: 'dev-1', hostname: 'desktop-pc', ip: '192.168.1.10',
      mac: '00:11:22:33:44:55', vendor: 'Intel',
      connectionType: 'WIRED', signalDbm: null,
      txRateMbps: 1000, rxRateMbps: 1000,
      uploadBytes: 2_147_483_648, downloadBytes: 10_737_418_240,
      connectedSince: '2026-05-01T08:00:00+03:00',
      isBlocked: false, isStatic: true, customName: 'Desktop PC', iconType: 'computer',
    },
    {
      id: 'dev-2', hostname: 'iphone-kuray', ip: '192.168.1.101',
      mac: 'A4:C3:F0:11:22:33', vendor: 'Apple',
      connectionType: 'WIFI_5', signalDbm: -55,
      txRateMbps: 433, rxRateMbps: 433,
      uploadBytes: 524_288_000, downloadBytes: 3_221_225_472,
      connectedSince: '2026-05-02T09:15:00+03:00',
      isBlocked: false, isStatic: false, customName: 'iPhone', iconType: 'phone',
    },
    {
      id: 'dev-3', hostname: 'laptop-work', ip: '192.168.1.102',
      mac: 'B8:E8:56:AA:BB:CC', vendor: 'Lenovo',
      connectionType: 'WIFI_5', signalDbm: -62,
      txRateMbps: 300, rxRateMbps: 300,
      uploadBytes: 1_073_741_824, downloadBytes: 5_368_709_120,
      connectedSince: '2026-05-02T08:30:00+03:00',
      isBlocked: false, isStatic: false, customName: 'Work Laptop', iconType: 'laptop',
    },
    {
      id: 'dev-4', hostname: 'smart-tv', ip: '192.168.1.103',
      mac: 'C4:71:54:DD:EE:FF', vendor: 'Samsung',
      connectionType: 'WIRED', signalDbm: null,
      txRateMbps: 100, rxRateMbps: 100,
      uploadBytes: 104_857_600, downloadBytes: 21_474_836_480,
      connectedSince: '2026-04-20T19:00:00+03:00',
      isBlocked: false, isStatic: false, customName: 'Smart TV', iconType: 'tv',
    },
    {
      id: 'dev-5', hostname: 'nas-server', ip: '192.168.1.11',
      mac: '00:11:22:33:44:66', vendor: 'Synology',
      connectionType: 'WIRED', signalDbm: null,
      txRateMbps: 1000, rxRateMbps: 1000,
      uploadBytes: 5_368_709_120, downloadBytes: 107_374_182_400,
      connectedSince: '2026-04-01T00:00:00+03:00',
      isBlocked: false, isStatic: true, customName: 'NAS Server', iconType: 'nas',
    },
    {
      id: 'dev-6', hostname: 'unknown-device', ip: '192.168.1.150',
      mac: '02:42:AC:11:22:33', vendor: null,
      connectionType: 'WIFI_2_4', signalDbm: -78,
      txRateMbps: 54, rxRateMbps: 54,
      uploadBytes: 10_485_760, downloadBytes: 52_428_800,
      connectedSince: '2026-05-02T13:00:00+03:00',
      isBlocked: true, isStatic: false, customName: null, iconType: 'unknown',
    },
  ],

  nat: {
    portForwardRules: [
      { id: 'pf-1', name: 'HTTP Server',  enabled: true,  protocol: 'TCP', externalPort: 80,    internalIp: '192.168.1.10', internalPort: 8080,  remoteIp: null },
      { id: 'pf-2', name: 'HTTPS Server', enabled: true,  protocol: 'TCP', externalPort: 443,   internalIp: '192.168.1.10', internalPort: 8443,  remoteIp: null },
      { id: 'pf-3', name: 'SSH Admin',    enabled: false, protocol: 'TCP', externalPort: 2222,  internalIp: '192.168.1.10', internalPort: 22,    remoteIp: null },
      { id: 'pf-4', name: 'Plex Media',   enabled: true,  protocol: 'TCP', externalPort: 32400, internalIp: '192.168.1.11', internalPort: 32400, remoteIp: null },
    ],
    portTriggerRules: [],
    dmz:  { enabled: false, targetIp: '' },
    upnp: { enabled: true, advertisePeriod: 1800, ttl: 4, announceUrl: null },
    hairpinNat: true,
  },

  firewall: {
    enabled:       true,
    ipv6Enabled:   true,
    dosProtection: true,
    logDropped:    false,
    rules: [
      {
        id: 'fw-1', name: 'Block Telnet', enabled: true, target: 'WAN_IN',
        protocol: 'TCP', srcIp: null, srcPort: null, dstIp: null, dstPort: 23,
        action: 'DROP', order: 1,
      },
      {
        id: 'fw-2', name: 'Block SMB from WAN', enabled: true, target: 'WAN_IN',
        protocol: 'TCP', srcIp: null, srcPort: null, dstIp: null, dstPort: { start: 445, end: 445 },
        action: 'DROP', order: 2,
      },
    ],
    macFilterMode:  'BLACKLIST',
    macFilterRules: [
      { id: 'mf-1', mac: '02:42:AC:11:22:33', comment: 'Unknown suspicious device' },
    ],
    ipFilterRules: [],
    pingFromWan:  false,
    sshFromWan:   false,
    httpFromWan:  false,
  },

  qos: {
    mode: 'ADAPTIVE',
    bandwidth: { uploadKbps: 100_000, downloadKbps: 500_000 },
    deviceRules: [
      { id: 'qos-1', mac: 'B8:E8:56:AA:BB:CC', name: 'Work Laptop', priority: 'HIGH', uploadLimitKbps: null, downloadLimitKbps: null },
    ],
    appRules: [
      { id: 'app-1', category: 'GAMING',    priority: 'HIGHEST' },
      { id: 'app-2', category: 'VOIP',      priority: 'HIGHEST' },
      { id: 'app-3', category: 'STREAMING', priority: 'HIGH'    },
    ],
  },

  vpn: [
    {
      id: 'vpn-1', name: 'WireGuard Home Server', type: 'WIREGUARD',
      role: 'SERVER', status: 'ACTIVE', enabled: true, serverAddr: null,
      openvpn: null,
      wireguard: {
        listenPort: 51820,
        privateKey: 'PRIVATE_KEY_HIDDEN',
        publicKey:  'ABC123pubkey==',
        address:    '10.0.0.1/24',
        dns:        '1.1.1.1',
        peers: [
          {
            id: 'peer-1', name: 'Phone', publicKey: 'XYZ456pubkey==',
            allowedIps: ['10.0.0.2/32'], endpoint: null,
            lastHandshake: '2026-05-02T14:28:00+03:00',
            transferTx: 52_428_800, transferRx: 104_857_600,
          },
        ],
      },
      clientCount: 1, connectedAt: null,
    },
    {
      id: 'vpn-2', name: 'OpenVPN Client', type: 'OPENVPN',
      role: 'CLIENT', status: 'INACTIVE', enabled: false, serverAddr: 'vpn.example.com',
      openvpn: { port: 1194, protocol: 'UDP', cipher: 'AES-256-GCM', auth: 'SHA256', compression: false, tls_auth: true },
      wireguard: null,
      clientCount: 0, connectedAt: null,
    },
  ],

  parental: {
    enabled: true,
    safeDns:  false,
    profiles: [
      {
        id: 'pp-1', name: 'Kids Profile', enabled: true,
        devices: ['C4:71:54:DD:EE:FF'],
        blockedCategories: ['ADULT', 'GAMBLING', 'VIOLENCE', 'DRUGS'],
        customBlockedDomains: ['tiktok.com'],
        allowedDomains: [],
        schedule: [
          { day: 'MON', startTime: '07:00', endTime: '21:00' },
          { day: 'SAT', startTime: '09:00', endTime: '22:00' },
        ],
        dailyLimitMinutes: 120,
        pauseNow: false,
      },
    ],
  },

  usb: {
    sambaEnabled: true,
    ftpEnabled:   false,
    ftpPort:      21,
    devices: [
      {
        id: 'usb-1', label: 'My Passport', type: 'STORAGE',
        vendor: 'Western Digital',
        totalBytes: 2_000_000_000_000,
        usedBytes:   875_000_000_000,
        filesystem: 'NTFS', mounted: true, mountPath: '/tmp/mnt/sda1',
      },
    ],
    sharedFolders: [
      { id: 'sf-1', name: 'Media',  path: '/Media',  readOnly: false, samba: true, ftp: false, password: null },
      { id: 'sf-2', name: 'Backup', path: '/Backup', readOnly: true,  samba: true, ftp: false, password: 'backup123' },
    ],
  },

  traffic: {
    interfaces: [
      { interface: 'WAN',     uploadBytes: 15_728_640_000, downloadBytes:  73_400_320_000, history: [] },
      { interface: 'WLAN_2G', uploadBytes:    524_288_000, downloadBytes:   2_147_483_648, history: [] },
      { interface: 'WLAN_5G', uploadBytes:  2_097_152_000, downloadBytes:  10_737_418_240, history: [] },
    ],
    topDevices: [
      { mac: '00:11:22:33:44:55', hostname: 'desktop-pc', uploadBytes:  2_147_483_648, downloadBytes:  10_737_418_240 },
      { mac: '00:11:22:33:44:66', hostname: 'nas-server', uploadBytes:  5_368_709_120, downloadBytes: 107_374_182_400 },
    ],
    periodStart: '2026-05-01T00:00:00+03:00',
    periodEnd:   '2026-05-02T14:30:00+03:00',
  },

  led: {
    mode:      'SCHEDULED',
    schedule:  { startTime: '08:00', endTime: '23:00' },
    nightMode: true,
  },

  notifications: {
    email:   'user@example.com',
    enabled: ['FIRMWARE_AVAILABLE', 'WAN_DISCONNECTED', 'INTRUSION_DETECTED'],
    syslogServer: null,
  },

  alerts: [
    { id: 'al-1', type: 'FIRMWARE_AVAILABLE', timestamp: '2026-05-02T10:00:00+03:00', message: 'New firmware 3.0.0.4.390.10020 is available', read: false, severity: 'INFO'     },
    { id: 'al-2', type: 'DEVICE_JOINED',       timestamp: '2026-05-02T13:00:00+03:00', message: 'Unknown device joined: 02:42:AC:11:22:33',   read: false, severity: 'WARNING'  },
    { id: 'al-3', type: 'WAN_DISCONNECTED',    timestamp: '2026-04-28T03:15:00+03:00', message: 'WAN connection lost (PPPoE)',                 read: true,  severity: 'CRITICAL' },
  ],

  logs: [
    { id: 'log-1', timestamp: '2026-05-02T14:28:00+03:00', level: 'INFO',    source: 'WIFI',     message: 'Station A4:C3:F0:11:22:33 associated to 5GHz',        details: null },
    { id: 'log-2', timestamp: '2026-05-02T13:00:00+03:00', level: 'WARNING', source: 'WIFI',     message: 'Unknown device 02:42:AC:11:22:33 joined 2.4GHz',      details: null },
    { id: 'log-3', timestamp: '2026-05-02T09:15:00+03:00', level: 'INFO',    source: 'DHCP',     message: 'DHCP lease: 192.168.1.101 → A4:C3:F0:11:22:33',       details: null },
    { id: 'log-4', timestamp: '2026-04-28T03:20:00+03:00', level: 'INFO',    source: 'WAN',      message: 'PPPoE reconnected successfully',                       details: 'IP: 88.247.123.45' },
    { id: 'log-5', timestamp: '2026-04-28T03:15:00+03:00', level: 'ERROR',   source: 'WAN',      message: 'PPPoE connection lost',                                details: 'LCP timeout' },
    { id: 'log-6', timestamp: '2026-04-20T19:00:00+03:00', level: 'INFO',    source: 'DHCP',     message: 'DHCP lease: 192.168.1.103 → C4:71:54:DD:EE:FF',       details: null },
  ],
};
