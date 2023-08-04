export default [
	{
		type: 'threat',
		name: 'Malware Outbreak',
		threat: 3,
		cost: 2,
		image: '/cards/M_O_Card.png',
		description: 'Widespread harmful software infecting multiple devices and systems.'
	},
	{
		type: 'threat',
		name: 'Phishing Campaign',
		threat: 2,
		cost: 1,
		image: '/cards/P_C_Card.png',
		description:
			'Email scam impersonating trusted entities to steal personal information and sensitive data.'
	},
	{
		type: 'threat',
		name: 'DDoS (Distributed Denial of Service) Attack',
		threat: 4,
		cost: 3,
		image: '/cards/DDoS_Card.png',
		description: 'Overwhelm server with traffic, blocking user access to online services and sites.'
	},
	{
		type: 'threat',
		name: 'Ransomware',
		threat: 5,
		cost: 4,
		image: '/cards/R_W_Card.png',
		description:
			"Malware demanding payment for system or file access; locks users' data until ransom paid."
	},
	{
		type: 'threat',
		name: 'Insider Threat',
		threat: 3,
		cost: 2,
		image: '/cards/I_T_Card.png',
		description: 'A stealthy risk originating from within, whether deliberate or accidental.'
	},
	{
		type: 'threat',
		name: 'Brute Force Attack',
		threat: 2,
		cost: 1,
		image: '/cards/B_F_A_Card.png',
		description:
			'Trial and error method to crack passwords and gain unauthorized access to systems.'
	},
	{
		type: 'threat',
		name: 'Zero-Day Exploit',
		threat: 4,
		cost: 3,
		image: '/cards/Z_D_E_Card.png',
		description:
			'A just-discovered security flaw exploited by hackers before developers can address it.'
	},
	{
		type: 'threat',
		name: 'Social Engineering',
		threat: 2,
		cost: 1,
		image: '/cards/S_E_Card.png',
		description:
			'Deceptive tactics to manipulate individuals into divulging information or taking unauthorized actions.'
	},
	{
		type: 'threat',
		name: 'Trojan Horse',
		threat: 3,
		cost: 2,
		image: '/cards/T_H_Card.png',
		description:
			'Malicious software disguised as legit program to gain system access through social engineering.'
	},
	{
		type: 'security',
		name: 'Firewall',
		security: 3,
		cost: 2,
		image: '/cards/F_W_Card.png',
		description:
			'Network security device filtering traffic based on established policies between private network and Internet.'
	},
	{
		type: 'security',
		name: 'Antivirus Software',
		security: 2,
		cost: 1,
		image: '/cards/A_V_Card.png',
		description:
			'Protects, scans, detects, and removes computer viruses; offers real-time defense against attacks.'
	},
	{
		type: 'security',
		name: 'Encryption',
		security: 2,
		cost: 1,
		image: '/cards/E_N_Card.png',
		description:
			'Data scrambling for authorized understanding; plaintext to ciphertext, making information appear random.'
	},
	{
		type: 'security',
		name: 'Intrusion Detection System (IDS)',
		security: 3,
		cost: 2,
		image: '/cards/I_D_S_Card.png',
		description:
			'Network monitor for malicious activity, reports to security management.Can respond to intrusion.'
	},
	{
		type: 'security',
		name: 'Two-Factor Authentication (2FA)',
		security: 2,
		cost: 1,
		image: '/cards/2F_A_Card.png',
		description:
			'Enhanced security system requiring two forms of ID for access, e.g., password and smartphone code.'
	},
	{
		type: 'security',
		name: 'Patch Management',
		security: 2,
		cost: 1,
		image: '/cards/P_M_Card.png',
		description:
			'Applying updates to protect against vulnerabilities and optimize system performance.'
	},
	{
		type: 'security',
		name: 'Network Monitoring',
		security: 3,
		cost: 2,
		image: '/cards/N_M_Card.png',
		description:
			'Constantly scan networks for issues to notify admins of internal problems (e.g., slow traffic, failures).'
	},
	{
		type: 'security',
		name: 'Secure Password Policy',
		security: 1,
		cost: 1,
		image: '/cards/S_P_P_Card.png',
		description:
			"Improves security with rules for creating and managing dependable passwords. Part of organization's regulations."
	},
	{
		type: 'security',
		name: 'Biometric Authentication',
		security: 4,
		cost: 3,
		image: '/cards/B_A_Card.png',
		description:
			'Secure cybersecurity using unique biological traits like fingerprints, voices, retinas, and facial features for user identity verification.'
	},
	{
		type: 'security',
		name: 'Secure Socket Layer',
		security: 3,
		cost: 2,
		image: '/cards/S_S_L_Card.png',
		description:
			'Secure protocol enabling encrypted Internet communication through symmetric and asymmetric cryptography.'
	},
	{
		type: 'security',
		name: 'Security Patch',
		security: 2,
		cost: 1,
		image: '/cards/S_P_Card.png',
		description:
			"Software update fixing security and other issues for an organization's assets, from the manufacturer."
	}
];
