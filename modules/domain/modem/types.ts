/* =========================================================
   ROUTER / MODEM ADMIN TYPES
   Based on ASUS / TP-Link admin panel conventions
========================================================= */

/* ─── Shared primitives ─── */

export type ConnectionStatus = 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING' | 'ERROR';
export type EnabledStatus    = 'ENABLED'   | 'DISABLED';
export type TrafficDirection = 'UPLOAD'    | 'DOWNLOAD' | 'BOTH';
export type Protocol         = 'TCP' | 'UDP' | 'TCP_UDP' | 'ICMP';
export type IpVersion        = 'IPV4' | 'IPV6' | 'DUAL';

/* =========================================================
   SYSTEM
========================================================= */

export type RouterModel = {
  manufacturer: string;    // e.g. 'ASUS', 'TP-Link'
  model:        string;    // e.g. 'RT-AX88U'
  hardware:     string;    // e.g. '1.0'
  serial:       string;
};

export type FirmwareInfo = {
  currentVersion: string;   // e.g. '3.0.0.4.388.24198'
  latestVersion:  string | null;
  buildDate:      string;
  updateAvailable: boolean;
  autoUpdateEnabled: boolean;
};

export type ResourceUsage = {
  cpuPercent:       number;   // 0–100
  memoryPercent:    number;   // 0–100
  memoryTotalMb:    number;
  memoryUsedMb:     number;
  flashTotalMb:     number;
  flashUsedMb:      number;
  temperatureCelsius: number | null;
};

export type SystemTime = {
  current:   string;          // ISO 8601
  timezone:  string;          // e.g. 'Europe/Istanbul'
  ntpServer: string;
  ntpEnabled: boolean;
  uptimeSeconds: number;
};

export type SystemInfo = {
  model:      RouterModel;
  firmware:   FirmwareInfo;
  resources:  ResourceUsage;
  time:       SystemTime;
  hostname:   string;
  wanMac:     string;
  lanMac:     string;
  wifiMac24:  string;
  wifiMac5:   string;
  wifiMac6:   string | null;   // 6 GHz — newer devices only
};

/* =========================================================
   WAN
========================================================= */

export type WanConnectionType = 'DHCP' | 'PPPOE' | 'STATIC' | 'L2TP' | 'PPTP';

export type WanPppoeConfig = {
  username:      string;
  password:      string;
  serviceName:   string;
  mtu:           number;
  connectOnDemand: boolean;
  maxIdleMinutes:  number | null;
};

export type WanStaticConfig = {
  ipAddress:   string;
  subnetMask:  string;
  gateway:     string;
  dnsPrimary:  string;
  dnsSecondary: string | null;
};

export type WanStatus = {
  connectionType: WanConnectionType;
  status:         ConnectionStatus;
  ipAddress:      string | null;
  subnetMask:     string | null;
  gateway:        string | null;
  dnsPrimary:     string | null;
  dnsSecondary:   string | null;
  ipv6Address:    string | null;
  mtu:            number;
  uplinkMbps:     number | null;   // ISP reported speed
  downlinkMbps:   number | null;
  connectedSince: string | null;   // ISO 8601
  pppoe:          WanPppoeConfig  | null;
  static:         WanStaticConfig | null;
};

/* =========================================================
   LAN
========================================================= */

export type DhcpLeaseEntry = {
  ip:         string;
  mac:        string;
  hostname:   string;
  leaseTime:  string;   // e.g. '23:45:12' remaining, or 'Permanent'
  isStatic:   boolean;
};

export type DhcpStaticBinding = {
  id:       string;
  mac:      string;
  ip:       string;
  hostname: string;
};

export type DhcpServerConfig = {
  enabled:       boolean;
  poolStart:     string;
  poolEnd:       string;
  subnetMask:    string;
  gateway:       string;
  dnsPrimary:    string;
  dnsSecondary:  string | null;
  leaseHours:    number;
  staticBindings: DhcpStaticBinding[];
};

export type LanConfig = {
  ipAddress:  string;
  subnetMask: string;
  dhcp:       DhcpServerConfig;
  ipv6Enabled: boolean;
};

/* =========================================================
   WIFI
========================================================= */

export type WifiBand       = '2.4GHz' | '5GHz' | '6GHz';
export type WifiSecurityMode = 'OPEN' | 'WPA2_PERSONAL' | 'WPA3_PERSONAL' | 'WPA2_WPA3_MIXED' | 'WPA2_ENTERPRISE' | 'WPA3_ENTERPRISE';
export type WifiBandwidth  = '20MHz' | '40MHz' | '80MHz' | '160MHz' | '320MHz';
export type WifiStandard   = '802.11b/g/n' | '802.11a/n/ac' | '802.11ax' | '802.11be';

export type WifiRadio = {
  band:           WifiBand;
  standard:       WifiStandard;
  enabled:        boolean;
  channel:        number | 'auto';
  channelWidth:   WifiBandwidth;
  txPowerPercent: number;       // 0–100
  beamforming:    boolean;
  mu_mimo:        boolean;
  ofdma:          boolean;      // Wi-Fi 6+
};

export type WifiNetwork = {
  id:           string;
  band:         WifiBand;
  ssid:         string;
  hidden:       boolean;
  securityMode: WifiSecurityMode;
  password:     string;
  vlanId:       number | null;
  isGuest:      boolean;
  guestIsolate: boolean;       // isolate guest clients from LAN
  maxClients:   number | null;
  enabled:      boolean;
  schedule:     WifiSchedule | null;
};

export type WifiSchedule = {
  enabled:    boolean;
  rules:      WifiScheduleRule[];
};

export type WifiScheduleRule = {
  day:       'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  startTime: string;   // 'HH:MM'
  endTime:   string;
};

export type WifiConfig = {
  radios:   WifiRadio[];
  networks: WifiNetwork[];
  wps:      WpsConfig;
  roaming:  RoamingConfig;
};

export type WpsConfig = {
  enabled: boolean;
  pin:     string;
};

export type RoamingConfig = {
  enabled:      boolean;
  threshold80211r: boolean;
  threshold80211k: boolean;
  threshold80211v: boolean;
  rssiThreshold: number;   // dBm
};

/* =========================================================
   CONNECTED DEVICES
========================================================= */

export type DeviceConnectionType = 'WIRED' | 'WIFI_2_4' | 'WIFI_5' | 'WIFI_6';

export type ConnectedDevice = {
  id:             string;
  hostname:       string;
  ip:             string;
  mac:            string;
  vendor:         string | null;    // OUI-derived vendor name
  connectionType: DeviceConnectionType;
  signalDbm:      number | null;    // Wi-Fi only
  txRateMbps:     number | null;
  rxRateMbps:     number | null;
  uploadBytes:    number;
  downloadBytes:  number;
  connectedSince: string;           // ISO 8601
  isBlocked:      boolean;
  isStatic:       boolean;          // has static DHCP binding
  customName:     string | null;
  iconType:       DeviceIconType;
};

export type DeviceIconType =
  | 'computer'
  | 'laptop'
  | 'phone'
  | 'tablet'
  | 'tv'
  | 'gaming'
  | 'printer'
  | 'camera'
  | 'iot'
  | 'router'
  | 'nas'
  | 'unknown';

/* =========================================================
   PORT FORWARDING & NAT
========================================================= */

export type PortForwardRule = {
  id:           string;
  name:         string;
  enabled:      boolean;
  protocol:     Protocol;
  externalPort: number | PortRange;
  internalIp:   string;
  internalPort: number | PortRange;
  remoteIp:     string | null;     // restrict to specific source IP
};

export type PortRange = {
  start: number;
  end:   number;
};

export type PortTriggerRule = {
  id:           string;
  name:         string;
  enabled:      boolean;
  triggerProtocol: Protocol;
  triggerPort:     number | PortRange;
  openProtocol:    Protocol;
  openPort:        number | PortRange;
};

export type DmzConfig = {
  enabled:  boolean;
  targetIp: string;
};

export type UpnpConfig = {
  enabled:         boolean;
  advertisePeriod: number;   // seconds
  ttl:             number;
  announceUrl:     string | null;
};

export type NatConfig = {
  portForwardRules: PortForwardRule[];
  portTriggerRules: PortTriggerRule[];
  dmz:              DmzConfig;
  upnp:             UpnpConfig;
  hairpinNat:       boolean;
};

/* =========================================================
   FIREWALL
========================================================= */

export type FirewallAction     = 'ACCEPT' | 'DROP' | 'REJECT';
export type FirewallRuleTarget = 'WAN_IN' | 'WAN_OUT' | 'LAN_IN' | 'LAN_OUT';

export type FirewallRule = {
  id:         string;
  name:       string;
  enabled:    boolean;
  target:     FirewallRuleTarget;
  protocol:   Protocol | 'ALL';
  srcIp:      string | null;    // CIDR or single IP, null = any
  srcPort:    number | PortRange | null;
  dstIp:      string | null;
  dstPort:    number | PortRange | null;
  action:     FirewallAction;
  order:      number;
};

export type MacFilterMode = 'BLACKLIST' | 'WHITELIST';

export type MacFilterRule = {
  id:      string;
  mac:     string;
  comment: string;
};

export type IpFilterRule = {
  id:        string;
  direction: TrafficDirection;
  ipRange:   string;          // CIDR
  protocol:  Protocol | 'ALL';
  port:      number | PortRange | null;
  action:    FirewallAction;
};

export type FirewallConfig = {
  enabled:          boolean;
  ipv6Enabled:      boolean;
  dosProtection:    boolean;
  logDropped:       boolean;
  rules:            FirewallRule[];
  macFilterMode:    MacFilterMode;
  macFilterRules:   MacFilterRule[];
  ipFilterRules:    IpFilterRule[];
  pingFromWan:      boolean;
  sshFromWan:       boolean;
  httpFromWan:      boolean;
};

/* =========================================================
   QOS (Quality of Service)
========================================================= */

export type QosMode = 'DISABLED' | 'TRADITIONAL' | 'ADAPTIVE' | 'MANUAL';
export type QosPriority = 'HIGHEST' | 'HIGH' | 'MEDIUM' | 'LOW' | 'LOWEST';

export type QosBandwidthSetting = {
  uploadKbps:   number;    // 0 = auto
  downloadKbps: number;
};

export type QosDeviceRule = {
  id:       string;
  mac:      string;
  name:     string;
  priority: QosPriority;
  uploadLimitKbps:   number | null;
  downloadLimitKbps: number | null;
};

export type QosAppCategory =
  | 'STREAMING'
  | 'GAMING'
  | 'VOIP'
  | 'WEB_BROWSING'
  | 'FILE_SHARING'
  | 'BACKUP'
  | 'OTHER';

export type QosAppRule = {
  id:       string;
  category: QosAppCategory;
  priority: QosPriority;
};

export type QosConfig = {
  mode:        QosMode;
  bandwidth:   QosBandwidthSetting;
  deviceRules: QosDeviceRule[];
  appRules:    QosAppRule[];
};

/* =========================================================
   VPN
========================================================= */

export type VpnType = 'OPENVPN' | 'WIREGUARD' | 'PPTP' | 'L2TP_IPSEC' | 'IPSEC';
export type VpnRole = 'SERVER' | 'CLIENT';
export type VpnStatus = 'ACTIVE' | 'INACTIVE' | 'ERROR' | 'CONNECTING';

export type OpenVpnConfig = {
  port:       number;
  protocol:   'TCP' | 'UDP';
  cipher:     string;
  auth:       string;
  compression: boolean;
  tls_auth:   boolean;
};

export type WireGuardPeer = {
  id:          string;
  name:        string;
  publicKey:   string;
  allowedIps:  string[];
  endpoint:    string | null;
  lastHandshake: string | null;
  transferTx:  number;
  transferRx:  number;
};

export type WireGuardConfig = {
  listenPort: number;
  privateKey: string;
  publicKey:  string;
  address:    string;
  dns:        string | null;
  peers:      WireGuardPeer[];
};

export type VpnInstance = {
  id:         string;
  name:       string;
  type:       VpnType;
  role:       VpnRole;
  status:     VpnStatus;
  enabled:    boolean;
  serverAddr: string | null;   // for client mode
  openvpn:    OpenVpnConfig  | null;
  wireguard:  WireGuardConfig | null;
  clientCount: number;          // for server mode
  connectedAt: string | null;   // ISO 8601, for client mode
};

/* =========================================================
   PARENTAL CONTROLS
========================================================= */

export type ContentCategory =
  | 'ADULT'
  | 'GAMBLING'
  | 'SOCIAL_MEDIA'
  | 'GAMING'
  | 'STREAMING_VIDEO'
  | 'STREAMING_MUSIC'
  | 'NEWS'
  | 'SHOPPING'
  | 'VIOLENCE'
  | 'DRUGS';

export type ParentalScheduleSlot = {
  day:       'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  startTime: string;   // 'HH:MM'
  endTime:   string;
};

export type ParentalProfile = {
  id:               string;
  name:             string;
  enabled:          boolean;
  devices:          string[];   // MAC addresses
  blockedCategories: ContentCategory[];
  customBlockedDomains: string[];
  allowedDomains:    string[];
  schedule:          ParentalScheduleSlot[];
  dailyLimitMinutes: number | null;
  pauseNow:          boolean;
};

export type ParentalControlsConfig = {
  enabled:  boolean;
  safeDns:  boolean;   // use DNS-based filtering (e.g. CleanBrowsing)
  profiles: ParentalProfile[];
};

/* =========================================================
   USB / STORAGE
========================================================= */

export type UsbDeviceType = 'STORAGE' | 'PRINTER' | 'MODEM' | 'UNKNOWN';

export type UsbDevice = {
  id:         string;
  label:      string | null;
  type:       UsbDeviceType;
  vendor:     string | null;
  totalBytes: number | null;
  usedBytes:  number | null;
  filesystem: string | null;   // e.g. 'NTFS', 'ext4', 'FAT32'
  mounted:    boolean;
  mountPath:  string | null;
};

export type SharedFolder = {
  id:       string;
  name:     string;
  path:     string;
  readOnly: boolean;
  samba:    boolean;
  ftp:      boolean;
  password: string | null;
};

export type UsbConfig = {
  sambaEnabled:  boolean;
  ftpEnabled:    boolean;
  ftpPort:       number;
  devices:       UsbDevice[];
  sharedFolders: SharedFolder[];
};

/* =========================================================
   TRAFFIC STATISTICS
========================================================= */

export type TrafficDataPoint = {
  timestamp:     string;    // ISO 8601
  uploadBytes:   number;
  downloadBytes: number;
};

export type InterfaceStats = {
  interface:     string;    // 'WAN', 'LAN', 'WLAN_2G', 'WLAN_5G', etc.
  uploadBytes:   number;
  downloadBytes: number;
  history:       TrafficDataPoint[];
};

export type TrafficStats = {
  interfaces:   InterfaceStats[];
  topDevices:   DeviceTrafficEntry[];
  periodStart:  string;   // ISO 8601
  periodEnd:    string;
};

export type DeviceTrafficEntry = {
  mac:           string;
  hostname:      string;
  uploadBytes:   number;
  downloadBytes: number;
};

/* =========================================================
   SYSTEM LOG
========================================================= */

export type LogLevel    = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
export type LogSource   = 'SYSTEM' | 'WIFI' | 'WAN' | 'FIREWALL' | 'VPN' | 'DHCP' | 'DNS' | 'PARENTAL' | 'USB';

export type LogEntry = {
  id:        string;
  timestamp: string;   // ISO 8601
  level:     LogLevel;
  source:    LogSource;
  message:   string;
  details:   string | null;
};

/* =========================================================
   LED
========================================================= */

export type LedMode = 'ON' | 'OFF' | 'SCHEDULED';

export type LedConfig = {
  mode:      LedMode;
  schedule:  { startTime: string; endTime: string } | null;
  nightMode: boolean;   // automatically dim after sunset
};

/* =========================================================
   NOTIFICATIONS / ALERTS
========================================================= */

export type AlertType =
  | 'DEVICE_JOINED'
  | 'DEVICE_LEFT'
  | 'WAN_DISCONNECTED'
  | 'WAN_RECONNECTED'
  | 'FIRMWARE_AVAILABLE'
  | 'INTRUSION_DETECTED'
  | 'PARENTAL_VIOLATION'
  | 'USB_MOUNTED'
  | 'HIGH_CPU'
  | 'HIGH_TEMPERATURE';

export type AlertEntry = {
  id:        string;
  type:      AlertType;
  timestamp: string;   // ISO 8601
  message:   string;
  read:      boolean;
  severity:  'INFO' | 'WARNING' | 'CRITICAL';
};

export type NotificationConfig = {
  email:     string | null;
  enabled:   AlertType[];
  syslogServer: string | null;
};

/* =========================================================
   AGGREGATED ROUTER STATE  (passed to views as top-level)
========================================================= */

export type RouterState = {
  system:           SystemInfo;
  wan:              WanStatus;
  lan:              LanConfig;
  wifi:             WifiConfig;
  connectedDevices: ConnectedDevice[];
  nat:              NatConfig;
  firewall:         FirewallConfig;
  qos:              QosConfig;
  vpn:              VpnInstance[];
  parental:         ParentalControlsConfig;
  usb:              UsbConfig;
  traffic:          TrafficStats;
  led:              LedConfig;
  notifications:    NotificationConfig;
  alerts:           AlertEntry[];
  logs:             LogEntry[];
};
