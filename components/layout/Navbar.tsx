'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown,
  Globe, Calendar, FileText, Shield, Lock, MessageSquare,
  CreditCard, Brush, Wrench, BarChart2, DollarSign, Link2, Smartphone, Share2,
  BookOpen, LifeBuoy, Code2, Award, Zap, Building2, Users, ArrowRight, Play,
  CheckCircle2, Star, Layers, Cpu, Sparkles, RefreshCw, TrendingUp,
  Home, LayoutGrid, Plug, Tag,
} from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '@/lib/LanguageContext';
import { useDemoModal } from '@/lib/DemoModalContext';

/* ── feature categories ─────────────────────────────────── */
const FEATURE_CATEGORIES_EN = [
  {
    label: 'Channel Manager',
    desc: 'List on every major OTA',
    color: '#25A4E8',
    icon: Globe,
    items: [
      { slug: 'channel-manager/aqar',    href: '/integrations/aqar',                    logo: '/logos/AQAR.png',        label: 'AQAR',         desc: 'Saudi local OTA platform',         icon: Building2,  isNew: false },
      { slug: 'channel-manager/ejar',    href: '/integrations/ejar-ota',                logo: '/logos/EJAR.svg',        label: 'Ejar',         desc: 'Government rental platform',       icon: FileText,   isNew: false },
      { slug: 'channel-manager/airbnb',  href: '/integrations/airbnb',                  logo: '/logos/Airbnb.svg',      label: 'Airbnb',       desc: 'Global short-term rental OTA',     icon: Globe,      isNew: false },
      { slug: 'channel-manager/booking', href: '/integrations/booking-com',             logo: '/logos/Booking.com.svg', label: 'Booking.com',  desc: 'World\'s largest OTA platform',   icon: Globe,      isNew: false },
      { slug: 'channel-manager/agoda',   href: '/integrations/agoda',                   logo: '/logos/Agoda.svg',       label: 'AGODA',        desc: 'Asia-Pacific OTA leader',          icon: Globe,      isNew: false },
      { slug: 'channel-manager/google',  href: '/integrations/google-vacation-rentals', logo: '/logos/GoogleVR.svg',    label: 'Google VR',    desc: 'Google Vacation Rentals',          icon: Globe,      isNew: false },
      { slug: 'channel-manager/qotoon',  href: '/integrations/qotoon',                  logo: '/logos/QOTOON.png',      label: 'Qotoon',       desc: 'Saudi rental platform',            icon: Globe,      isNew: true  },
      { slug: 'channel-manager/attiude', href: '/integrations/attiude',                 label: 'Attiude',      desc: 'Coming soon',                      icon: Globe,      isNew: true  },
    ],
  },
  {
    label: 'PMS',
    desc: 'Run your full property operation',
    color: '#7C69E8',
    icon: Layers,
    items: [
      { slug: 'unified-calendar',        label: 'Unified Calendar',    desc: 'All properties in one view',       icon: Calendar,      isNew: false },
      { slug: 'unified-inbox',           label: 'Unified Inbox',       desc: 'All guest messages in one place',  icon: MessageSquare, isNew: false },
      { slug: 'channel-management',      label: 'Channel Management',  desc: 'Manage all OTA connections',       icon: Globe,         isNew: false },
      { slug: 'task-management',         label: 'Task Management',     desc: 'Assign and track team tasks',      icon: CheckCircle2,  isNew: false },
      { slug: 'housekeeping-management', label: 'Housekeeping',        desc: 'Auto-assign cleaning tasks',       icon: Brush,         isNew: false },
      { slug: 'direct-booking-website',  label: 'Direct Booking',      desc: 'Commission-free reservations',     icon: Link2,         isNew: false },
    ],
  },
  {
    label: 'Automation',
    desc: 'Automate the full guest journey',
    color: '#F59E0B',
    icon: Zap,
    items: [
      { slug: 'guest-journey',         label: 'Guest Journey',  desc: '7-step automated guest flow',      icon: Zap,           isNew: false },
      { slug: 'automated-messaging',   logo: '/icons/whatsapp.svg', label: 'WhatsApp',       desc: 'Guest comms on autopilot',         icon: MessageSquare, isNew: false },
      { slug: 'sms-notifications',     logo: '/logos/chat.svg',    label: 'SMS',            desc: 'Automated SMS via VFirst',         icon: Smartphone,    isNew: false },
      { slug: 'tuya-integration',      logo: '/logos/Tuya.png',    label: 'Tuya',           desc: 'Smart home & IoT automation',      icon: Cpu,           isNew: false },
      { slug: 'ttlock-integration',    logo: '/logos/TTLock.png',  label: 'TTLock',         desc: 'Smart lock door access',           icon: Lock,          isNew: false },
    ],
  },
  {
    label: 'Owners & Finance',
    desc: 'Full financial transparency',
    color: '#10B981',
    icon: DollarSign,
    items: [
      { slug: 'expenses-model',     label: 'Expenses Model', desc: 'Track all property costs',          icon: CreditCard, isNew: false },
      { slug: 'vat-model',          label: 'VAT Model',      desc: 'Saudi VAT & ZATCA compliance',      icon: FileText,   isNew: false },
      { slug: 'owner-portal',       label: 'Owner Portal',   desc: 'Branded portals per owner',         icon: Users,      isNew: false },
      { slug: 'extras-upsells',     label: 'Extra',          desc: 'Upsells & add-on services',         icon: Star,       isNew: false },
      { slug: 'payout',             label: 'Payout',         desc: 'Owner disbursements & splits',      icon: DollarSign, isNew: false },
      { slug: 'pay-link',           label: 'Pay Link',       desc: 'Send payment links to guests',      icon: Link2,      isNew: false },
    ],
  },
  {
    label: 'Damage Protection',
    desc: 'Protect your properties & income',
    color: '#EF4444',
    icon: Shield,
    items: [
      { slug: 'security-deposit',   label: 'Security Deposit',    desc: 'Automated deposit collection',    icon: Shield,       isNew: false },
      { slug: 'guest-verification', label: 'Absher Verification', desc: 'ID check before every check-in', icon: CheckCircle2, isNew: false },
      { slug: 'e-sign-contracts',   label: 'E-Sign Contract',     desc: 'Legally binding agreements',     icon: FileText,     isNew: false },
      { slug: 'tawuniya',           label: 'Tawuniya',            desc: 'Property insurance — soon',      icon: Shield,       isNew: true  },
    ],
  },
  {
    label: 'Branding',
    desc: 'Own your brand & direct bookings',
    color: '#EC4899',
    icon: Sparkles,
    items: [
      { slug: 'guest-app',              label: 'Branded App',     desc: 'White-label guest mobile app',    icon: Smartphone,    isNew: false },
      { slug: 'website-builder',        label: 'Website Builder', desc: 'Your own branded booking site',   icon: Code2,         isNew: false },
      { slug: 'referral-links',         label: 'Referral Link',   desc: 'Grow via ambassador referrals',   icon: Share2,        isNew: false },
      { slug: 'whatsapp-sms',           label: 'WhatsApp & SMS',  desc: 'Guest comms under your brand',    icon: MessageSquare, isNew: false },
    ],
  },
  {
    label: 'CRM',
    desc: 'Know and grow your guests',
    color: '#6366F1',
    icon: Users,
    items: [
      { slug: 'guest-profiles',    label: 'Guest Profile',      desc: 'Complete guest history & data',   icon: Users,  isNew: false },
      { slug: 'segmentation',      label: 'Segmentation',       desc: 'Target the right guests',         icon: Layers, isNew: false },
      { slug: 'coupons-discounts', label: 'Coupons / Discount', desc: 'Loyalty and promo tools',         icon: Star,   isNew: false },
      { slug: 'campaigns',         label: 'Campaigns',          desc: 'WhatsApp & SMS marketing',        icon: Zap,    isNew: false },
    ],
  },
];

const FEATURE_CATEGORIES_AR = [
  {
    label: 'مدير القنوات',
    desc: 'سرد على كل منصة OTA رئيسية',
    color: '#25A4E8',
    icon: Globe,
    items: [
      { slug: 'channel-manager/aqar',    href: '/integrations/aqar',                    logo: '/logos/AQAR.png',        label: 'عقار',         desc: 'منصة إيجار سعودية محلية',          icon: Building2,  isNew: false },
      { slug: 'channel-manager/ejar',    href: '/integrations/ejar-ota',                logo: '/logos/EJAR.svg',        label: 'إيجار',        desc: 'منصة الإيجار الحكومية',            icon: FileText,   isNew: false },
      { slug: 'channel-manager/airbnb',  href: '/integrations/airbnb',                  logo: '/logos/Airbnb.svg',      label: 'Airbnb',       desc: 'أكبر منصة إيجار قصير المدى',      icon: Globe,      isNew: false },
      { slug: 'channel-manager/booking', href: '/integrations/booking-com',             logo: '/logos/Booking.com.svg', label: 'Booking.com',  desc: 'أكبر منصة حجز في العالم',         icon: Globe,      isNew: false },
      { slug: 'channel-manager/agoda',   href: '/integrations/agoda',                   logo: '/logos/Agoda.svg',       label: 'AGODA',        desc: 'رائدة منطقة آسيا والمحيط الهادئ', icon: Globe,      isNew: false },
      { slug: 'channel-manager/google',  href: '/integrations/google-vacation-rentals', logo: '/logos/GoogleVR.svg',    label: 'Google VR',    desc: 'Google Vacation Rentals',          icon: Globe,      isNew: false },
      { slug: 'channel-manager/qotoon',  href: '/integrations/qotoon',                  logo: '/logos/QOTOON.png',      label: 'قطون',         desc: 'منصة إيجار سعودية',               icon: Globe,      isNew: true  },
      { slug: 'channel-manager/attiude', href: '/integrations/attiude',                 label: 'Attiude',      desc: 'قريباً',                           icon: Globe,      isNew: true  },
    ],
  },
  {
    label: 'نظام إدارة العقارات',
    desc: 'أدر عمليات عقاراتك بالكامل',
    color: '#7C69E8',
    icon: Layers,
    items: [
      { slug: 'unified-calendar',        label: 'التقويم الموحد',      desc: 'جميع العقارات في نظرة واحدة',     icon: Calendar,      isNew: false },
      { slug: 'unified-inbox',           label: 'صندوق الوارد الموحد', desc: 'رسائل الضيوف في مكان واحد',       icon: MessageSquare, isNew: false },
      { slug: 'channel-management',      label: 'إدارة القنوات',       desc: 'إدارة جميع تكاملات OTA',         icon: Globe,         isNew: false },
      { slug: 'task-management',         label: 'إدارة المهام',        desc: 'تعيين مهام الفريق وتتبعها',      icon: CheckCircle2,  isNew: false },
      { slug: 'housekeeping-management', label: 'التدبير المنزلي',     desc: 'تعيين مهام التنظيف تلقائياً',   icon: Brush,         isNew: false },
      { slug: 'direct-booking-website',  label: 'الحجز المباشر',       desc: 'حجوزات بدون عمولة',              icon: Link2,         isNew: false },
    ],
  },
  {
    label: 'الأتمتة',
    desc: 'أتمت رحلة الضيف بالكامل',
    color: '#F59E0B',
    icon: Zap,
    items: [
      { slug: 'guest-journey',         label: 'رحلة الضيف',  desc: 'تدفق مؤتمت من 7 خطوات',           icon: Zap,           isNew: false },
      { slug: 'automated-messaging',   logo: '/icons/whatsapp.svg', label: 'واتساب',      desc: 'تواصل الضيوف بشكل تلقائي',       icon: MessageSquare, isNew: false },
      { slug: 'sms-notifications',     logo: '/logos/chat.svg',    label: 'SMS',          desc: 'رسائل SMS تلقائية عبر VFirst',    icon: Smartphone,    isNew: false },
      { slug: 'tuya-integration',      logo: '/logos/Tuya.png',    label: 'Tuya',         desc: 'أتمتة المنزل الذكي وإنترنت الأشياء', icon: Cpu,        isNew: false },
      { slug: 'ttlock-integration',    logo: '/logos/TTLock.png',  label: 'TTLock',       desc: 'التحكم في الأقفال الذكية',        icon: Lock,          isNew: false },
    ],
  },
  {
    label: 'الملاك والمالية',
    desc: 'شفافية مالية كاملة',
    color: '#10B981',
    icon: DollarSign,
    items: [
      { slug: 'expenses-model',     label: 'نموذج المصروفات',    desc: 'تتبع جميع تكاليف العقارات',       icon: CreditCard, isNew: false },
      { slug: 'vat-model',          label: 'نموذج ضريبة القيمة', desc: 'الامتثال لزاتكا وضريبة القيمة',  icon: FileText,   isNew: false },
      { slug: 'owner-portal',       label: 'بوابة المالك',       desc: 'بوابات مخصصة لكل مالك',          icon: Users,      isNew: false },
      { slug: 'extras-upsells',     label: 'إضافات',             desc: 'خدمات وإضافات مدفوعة للضيوف',    icon: Star,       isNew: false },
      { slug: 'payout',             label: 'المدفوعات',          desc: 'صرف مستحقات الملاك',             icon: DollarSign, isNew: false },
      { slug: 'pay-link',           label: 'رابط الدفع',         desc: 'إرسال روابط دفع للضيوف',         icon: Link2,      isNew: false },
    ],
  },
  {
    label: 'حماية من الأضرار',
    desc: 'احمِ عقاراتك ودخلك',
    color: '#EF4444',
    icon: Shield,
    items: [
      { slug: 'security-deposit',   label: 'الوديعة الأمنية',     desc: 'تحصيل الودائع تلقائياً',         icon: Shield,       isNew: false },
      { slug: 'guest-verification', label: 'التحقق عبر أبشر',    desc: 'تحقق من هوية كل ضيف',           icon: CheckCircle2, isNew: false },
      { slug: 'e-sign-contracts',   label: 'العقد الإلكتروني',   desc: 'عقود ملزمة قانونياً عبر إيجار', icon: FileText,     isNew: false },
      { slug: 'tawuniya',           label: 'تعاونية',             desc: 'تأمين العقارات — قريباً',        icon: Shield,       isNew: true  },
    ],
  },
  {
    label: 'العلامة التجارية',
    desc: 'امتلك علامتك وحجوزاتك',
    color: '#EC4899',
    icon: Sparkles,
    items: [
      { slug: 'guest-app',              label: 'تطبيق مخصص',     desc: 'تطبيق جوال بعلامتك التجارية',   icon: Smartphone,    isNew: false },
      { slug: 'website-builder',        label: 'منشئ المواقع',   desc: 'موقع حجز مباشر باسمك',         icon: Code2,         isNew: false },
      { slug: 'referral-links',         label: 'رابط الإحالة',   desc: 'النمو عبر سفراء علامتك',       icon: Share2,        isNew: false },
      { slug: 'whatsapp-sms',           label: 'واتساب و SMS',    desc: 'تواصل تحت علامتك التجارية',    icon: MessageSquare, isNew: false },
    ],
  },
  {
    label: 'إدارة علاقات الضيوف',
    desc: 'اعرف ضيوفك وانمِ علاقتك بهم',
    color: '#6366F1',
    icon: Users,
    items: [
      { slug: 'guest-profiles',    label: 'ملف الضيف',           desc: 'تاريخ الضيف والبيانات الكاملة',  icon: Users,  isNew: false },
      { slug: 'segmentation',      label: 'التقسيم',             desc: 'استهدف الضيوف المناسبين',        icon: Layers, isNew: false },
      { slug: 'coupons-discounts', label: 'الكوبونات والخصومات', desc: 'أدوات الولاء والترويج',          icon: Star,   isNew: false },
      { slug: 'campaigns',         label: 'الحملات',             desc: 'تسويق عبر واتساب و SMS',         icon: Zap,    isNew: false },
    ],
  },
];

const INTEGRATIONS = [
  /* ── OTA (order matches spreadsheet: AQAR → Ejar → Airbnb → Booking → AGODA → Google VR → Qotoon → Attiude → Soon) ── */
  { slug: 'aqar',                    en: 'AQAR',                 ar: 'عقار',         logo: '/logos/AQAR.png',                    badge_en: 'OTA',         badge_ar: 'OTA' },
  { slug: 'ejar-ota',                en: 'Ejar',                 ar: 'إيجار',        logo: null,                                  badge_en: 'OTA',         badge_ar: 'OTA' },
  { slug: 'airbnb',                  en: 'Airbnb',               ar: 'Airbnb',       logo: '/logos/Airbnb.svg',                  badge_en: 'OTA',         badge_ar: 'OTA' },
  { slug: 'booking-com',             en: 'Booking.com',          ar: 'Booking',      logo: '/logos/Booking.com.svg',             badge_en: 'OTA',         badge_ar: 'OTA' },
  { slug: 'agoda',                   en: 'AGODA',                ar: 'أجودا',        logo: '/logos/Agoda.svg',                   badge_en: 'OTA',         badge_ar: 'OTA' },
  { slug: 'google-vacation-rentals', en: 'Google VR',            ar: 'Google VR',    logo: '/logos/GoogleVR.svg', badge_en: 'OTA',         badge_ar: 'OTA' },
  { slug: 'qotoon',                  en: 'Qotoon',               ar: 'قطون',         logo: null,                                  badge_en: 'OTA',         badge_ar: 'OTA' },
  { slug: 'attiude',                 en: 'Attiude',              ar: 'Attiude',      logo: null,                                  badge_en: 'OTA',         badge_ar: 'OTA' },
  { slug: 'almosafer',               en: 'Almosafer',            ar: 'المسافر',      logo: null,                                  badge_en: 'Soon',        badge_ar: 'قريباً' },
  { slug: 'darent',                  en: 'Darent',               ar: 'دارنت',        logo: null,                                  badge_en: 'Soon',        badge_ar: 'قريباً' },
  { slug: 'gathern',                 en: 'Gathern',              ar: 'غثرن',         logo: '/logos/gathern.webp',                 badge_en: 'Soon',        badge_ar: 'قريباً' },
  /* ── Government: Absher → Shmoos → Ministry of Tourism → Ejar ── */
  { slug: 'absher',                  en: 'Absher',               ar: 'أبشر',         logo: '/logos/Absher.png',                   badge_en: 'Gov',         badge_ar: 'حكومي' },
  { slug: 'shmoos',                  en: 'Shmoos',               ar: 'شموس',         logo: '/logos/shomoos.webp',                 badge_en: 'Gov',         badge_ar: 'حكومي' },
  { slug: 'mot',                     en: 'Ministry of Tourism',  ar: 'وزارة السياحة',logo: null,                                  badge_en: 'Gov',         badge_ar: 'حكومي' },
  { slug: 'ejar-gov',                en: 'Ejar',                 ar: 'إيجار',        logo: null,                                  badge_en: 'Gov',         badge_ar: 'حكومي' },
  /* ── Dynamic Pricing ── */
  { slug: 'pricelabs',               en: 'PriceLabs',            ar: 'PriceLabs',    logo: '/logos/pricelabs.webp',               badge_en: 'Pricing',     badge_ar: 'تسعير' },
  /* ── Smart Home: Tuya → TTLock ── */
  { slug: 'tuya',                    en: 'Tuya',                 ar: 'Tuya',         logo: '/logos/tuya.webp',                    badge_en: 'Smart Home',  badge_ar: 'منزل ذكي' },
  { slug: 'ttlock',                  en: 'TTLock',               ar: 'TTLock',       logo: '/logos/ttlock.webp',                  badge_en: 'Smart Home',  badge_ar: 'منزل ذكي' },
  /* ── Accounting: Odoo → Quyood → Daftra ── */
  { slug: 'odoo',                    en: 'Odoo',                 ar: 'Odoo',         logo: '/logos/odoo.webp',                    badge_en: 'Accounting',  badge_ar: 'محاسبة' },
  { slug: 'quyood',                  en: 'Quyood',               ar: 'قيود',         logo: '/logos/qoyod.webp',                   badge_en: 'Accounting',  badge_ar: 'محاسبة' },
  { slug: 'daftra',                  en: 'Daftra',               ar: 'دفترة',        logo: '/logos/daftra.webp',                  badge_en: 'Accounting',  badge_ar: 'محاسبة' },
  /* ── Bank: ANB ── */
  { slug: 'anb',                     en: 'ANB',                  ar: 'البنك العربي', logo: '/logos/ANB.svg',                      badge_en: 'Bank',        badge_ar: 'بنك' },
  /* ── Communication: WhatsApp → VFirst SMS ── */
  { slug: 'whatsapp',                en: 'WhatsApp',             ar: 'واتساب',       logo: '/icons/whatsapp.svg',                 badge_en: 'Messaging',   badge_ar: 'مراسلة' },
  { slug: 'vfirst-sms',              en: 'VFirst SMS',           ar: 'VFirst SMS',   logo: null,                                  badge_en: 'Messaging',   badge_ar: 'مراسلة' },
];

/* ── Feature-menu navigation resolution ──────────────────────
   Single source of truth for where each Features mega-menu / drawer item points.
   An item is PUBLISHED only if it resolves to an explicit href (carried in the
   category data itself, e.g. channel-manager/*, or supplied here). Items marked
   `hidden` are unresolved product concepts pending stakeholder confirmation and
   are removed from both desktop and mobile navigation. There is deliberately no
   blind `/features/${slug}` fallback — that is what created the 404 links. */
const FEATURE_NAV: Record<string, { href?: string; hidden?: boolean }> = {
  // PMS
  'unified-calendar':        { href: '/features/availability-calendar' },
  'unified-inbox':           { hidden: true },
  'channel-management':      { href: '/features/channel-manager' },
  'task-management':         { hidden: true },
  'housekeeping-management': { href: '/features/housekeeping-management' },
  'direct-booking-website':  { href: '/features/direct-booking-website' },
  // Automation
  'guest-journey':           { hidden: true },
  'automated-messaging':     { href: '/features/automated-messaging' },
  'sms-notifications':       { href: '/integrations/vfirst-sms' },
  'tuya-integration':        { href: '/integrations/tuya' },
  'ttlock-integration':      { href: '/integrations/ttlock' },
  // Owners & Finance
  'expenses-model':          { hidden: true },
  'vat-model':               { hidden: true },
  'owner-portal':            { href: '/features/owner-portal' },
  'extras-upsells':          { hidden: true },
  'payout':                  { hidden: true },
  'pay-link':                { href: '/features/payment-collection' },
  // Damage Protection
  'security-deposit':        { hidden: true },
  'guest-verification':      { href: '/features/guest-verification' },
  'e-sign-contracts':        { hidden: true },
  'tawuniya':                { hidden: true },   // status/category unconfirmed — hide until clarified
  // Branding
  'guest-app':               { href: '/features/guest-app' },
  'website-builder':         { href: '/features/direct-booking-website' },
  'referral-links':          { href: '/features/referral-links' },
  'whatsapp-sms':            { href: '/integrations/whatsapp' },
  // CRM (all unresolved — category is hidden until content exists)
  'guest-profiles':          { hidden: true },
  'segmentation':            { hidden: true },
  'coupons-discounts':       { hidden: true },
  'campaigns':               { hidden: true },
};

/* Resolve a feature-menu item to its destination, or null if it must be hidden.
   `item.href` (e.g. channel-manager/* → /integrations/*) always wins. */
function resolveFeatureHref(item: { slug: string; href?: string }): string | null {
  const meta = FEATURE_NAV[item.slug];
  if (meta?.hidden) return null;
  return item.href ?? meta?.href ?? null;
}

/* ── Integration categories (7 tabs, each filters INTEGRATIONS) ── */
const INTG_CATS = [
  { label_en: 'OTA',             label_ar: 'OTA',               color: '#FF5A5F', icon: Globe,         desc_en: 'Major booking platforms',        desc_ar: 'منصات الحجز الكبرى',
    slugs: ['aqar','ejar-ota','airbnb','booking-com','agoda','google-vacation-rentals','qotoon','attiude','almosafer','darent','gathern'] },
  { label_en: 'Government',      label_ar: 'حكومي',             color: '#10B981', icon: Building2,     desc_en: 'Saudi regulatory platforms',     desc_ar: 'المنصات الحكومية السعودية',
    slugs: ['absher','shmoos','mot','ejar-gov'] },
  { label_en: 'Dynamic Pricing', label_ar: 'تسعير ديناميكي',    color: '#F59E0B', icon: BarChart2,     desc_en: 'Revenue & rate management',      desc_ar: 'إدارة الإيرادات والأسعار',
    slugs: ['pricelabs'] },
  { label_en: 'Smart Home',      label_ar: 'منزل ذكي',          color: '#6366F1', icon: Cpu,           desc_en: 'IoT & smart lock automation',    desc_ar: 'أتمتة المنزل الذكي والأقفال',
    slugs: ['tuya','ttlock'] },
  { label_en: 'Accounting',      label_ar: 'محاسبة',            color: '#7C69E8', icon: FileText,      desc_en: 'Finance & bookkeeping tools',    desc_ar: 'أدوات المالية والمحاسبة',
    slugs: ['odoo','quyood','daftra'] },
  { label_en: 'Bank',            label_ar: 'بنك',               color: '#0F172A', icon: CreditCard,    desc_en: 'Saudi banking integration',      desc_ar: 'التكامل المصرفي السعودي',
    slugs: ['anb'] },
  { label_en: 'Communication',   label_ar: 'تواصل',             color: '#00A651', icon: MessageSquare, desc_en: 'Messaging & SMS platforms',      desc_ar: 'منصات الرسائل والسمس',
    slugs: ['whatsapp','vfirst-sms'] },
];

const SOLUTIONS = [
  { slug: 'property-managers',          en: 'Property Managers',            ar: 'مديرو العقارات',          desc_en: 'Manage 10–1,000+ units',        desc_ar: 'إدارة 10-1000+ وحدة',           color: '#25A4E8', icon: Building2 },
  { slug: 'vacation-rental-hosts',      en: 'Vacation Rental Hosts',        ar: 'مضيفو الإيجار السياحي',   desc_en: 'For independent hosts',         desc_ar: 'للمضيفين المستقلين',            color: '#7C69E8', icon: Globe },
  { slug: 'hotels-serviced-apartments', en: 'Hotels & Serviced Apartments', ar: 'الفنادق والشقق المفروشة', desc_en: 'Enterprise hotel tooling',      desc_ar: 'أدوات الفنادق المتقدمة',        color: '#F59E0B', icon: Layers },
  { slug: 'multi-owner-operators',      en: 'Multi-Owner Operators',        ar: 'مشغلو متعددو الملاك',     desc_en: 'Owner portals & split billing', desc_ar: 'بوابات الملاك وتقسيم الفواتير', color: '#10B981', icon: Users },
];

const RESOURCES_EN = [
  { icon: BookOpen, label: 'Blog',            desc: 'Tips, updates & guides',      href: '/blog' },
  { icon: LifeBuoy, label: 'Help Center',     desc: 'Answers to common questions', href: '/help' },
  { icon: Code2,    label: 'Documentation',   desc: 'Technical integration docs',  href: '/docs' },
  { icon: Award,    label: 'Case Studies',    desc: 'How operators use StayHub',   href: '/case-studies' },
  { icon: Zap,      label: 'Product Updates', desc: "What's new in StayHub",       href: '/updates' },
];
const RESOURCES_AR = [
  { icon: BookOpen, label: 'المدونة',        desc: 'نصائح وتحديثات وأدلة',        href: '/blog' },
  { icon: LifeBuoy, label: 'مركز المساعدة',  desc: 'إجابات للأسئلة الشائعة',      href: '/help' },
  { icon: Code2,    label: 'التوثيق',        desc: 'وثائق التكامل التقني',        href: '/docs' },
  { icon: Award,    label: 'دراسات الحالة',  desc: 'كيف يستخدم المشغّلون StayHub', href: '/case-studies' },
  { icon: Zap,      label: 'تحديثات المنتج', desc: 'الجديد في StayHub',            href: '/updates' },
];

type MenuKey = 'features' | 'integrations' | 'solutions' | 'resources' | null;

/* ── Shared promo panel ─────────────────────────────────── */
function PromoPanel({ isAr }: { isAr: boolean }) {
  return (
    <div className="w-[248px] shrink-0">
      <div
        className="rounded-2xl overflow-hidden h-full min-h-[260px] p-5 flex flex-col"
        style={{ background: 'linear-gradient(145deg, #0F172A 0%, #1e2d6b 50%, #25A4E8 100%)' }}
      >
        {/* Mini dashboard mockup */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4 relative">
          <div className="flex gap-1.5 mb-2.5">
            <div className="h-1.5 w-16 bg-white/70 rounded-full" />
            <div className="h-1.5 w-8 bg-white/30 rounded-full" />
          </div>
          <div className="space-y-2">
            {[['w-full', 'w-14'], ['w-3/4', 'w-10'], ['w-5/6', 'w-12']].map(([bar, val], i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`h-2 ${bar} bg-white/20 rounded-full flex-1`} />
                <div className={`h-2 ${val} bg-[#25A4E8]/80 rounded-full shrink-0`} />
              </div>
            ))}
          </div>
          {/* Floating play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
              <Play size={13} className="text-white ms-0.5" fill="white" />
            </div>
          </div>
        </div>

        <p className="text-white font-bold text-[13px] leading-tight mb-3">
          {isAr ? 'شاهد StayHub وهو يعمل' : 'See StayHub in action'}
        </p>
        <div className="space-y-2 flex-1">
          {(isAr
            ? ['أتمتة 7 خطوات لرحلة الضيف', 'فوترة متوافقة مع زاتكا', 'التحقق من الهوية عبر أبشر']
            : ['7-step guest journey automation', 'ZATCA-compliant invoicing', 'Absher ID verification']
          ).map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 size={13} className="text-[#25A4E8] shrink-0 mt-0.5" />
              <p className="text-white/80 text-[11px] leading-tight">{item}</p>
            </div>
          ))}
        </div>
        <Link
          href="/demo"
          className="mt-4 flex items-center justify-center gap-1.5 bg-white text-[#0F172A] text-[12px] font-bold py-2 rounded-xl hover:bg-blue-50 transition-colors"
        >
          {isAr ? 'شاهد العرض التجريبي' : 'Watch demo'}
          <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { lang, setLang, t, isAr } = useLanguage();
  const { openModal } = useDemoModal();
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeMenu,    setActiveMenu]    = useState<MenuKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<MenuKey>(null);
  const [mobileFeatureCat, setMobileFeatureCat] = useState<string | null>(null);
  const [activeCatIdx,  setActiveCatIdx]  = useState(0);
  const [activeSolIdx,  setActiveSolIdx]  = useState(0);
  const [activeIntgIdx, setActiveIntgIdx] = useState(0);
  const pathname   = usePathname();
  const menuRef    = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveMenu(null); }, [pathname]);

  const openMenu  = (key: MenuKey) => { if (leaveTimer.current) clearTimeout(leaveTimer.current); setActiveMenu(key); };
  const closeMenu = () => { leaveTimer.current = setTimeout(() => setActiveMenu(null), 120); };

  const featureCats = isAr ? FEATURE_CATEGORIES_AR : FEATURE_CATEGORIES_EN;
  // Published feature-menu categories only: drop hidden/unresolved items, then drop
  // any category left with no published items. Desktop + mobile both read from this.
  const visibleFeatureCats = featureCats
    .map(cat => ({ ...cat, items: cat.items.filter(it => resolveFeatureHref(it) !== null) }))
    .filter(cat => cat.items.length > 0);
  const activeCat = visibleFeatureCats[Math.min(activeCatIdx, visibleFeatureCats.length - 1)];
  const resources   = isAr ? RESOURCES_AR : RESOURCES_EN;

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  const bottomNav = [
    { href: '/',             icon: Home,       en: 'Home',         ar: 'الرئيسية',  active: pathname === '/' },
    { href: '/features',     icon: LayoutGrid, en: 'Features',     ar: 'المميزات',   active: pathname.startsWith('/features') },
    { href: '/integrations', icon: Plug,       en: 'Integrations', ar: 'التكاملات',  active: pathname.startsWith('/integrations') },
    { onClick: openModal,    icon: Tag,        en: 'Pricing',      ar: 'الأسعار',    active: false },
  ] as Array<{ href?: string; onClick?: () => void; icon: typeof Home; en: string; ar: string; active: boolean }>;

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/97 backdrop-blur-xl shadow-sm border-b border-slate-100/80'
            : 'bg-white/88 backdrop-blur-md'
        )}
        ref={menuRef}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              {/* h-11 in the h-16 bar = 69% of bar height (was h-9 / 56%).
                  width/height match the SVG's true 174x50 ratio (3.48) so next/image
                  doesn't warn and there's no layout shift. */}
              <Image src="/stayhub-logo.svg" alt="StayHub" width={153} height={44} className="h-11 w-auto" priority />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {(['features', 'solutions', 'integrations', 'resources'] as MenuKey[]).map((key) => (
                <button
                  key={key}
                  onMouseEnter={() => openMenu(key)}
                  onMouseLeave={closeMenu}
                  onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                  className={clsx(
                    'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors capitalize',
                    activeMenu === key
                      ? 'text-[#25A4E8] bg-blue-50'
                      : 'text-slate-600 hover:text-[#25A4E8] hover:bg-blue-50/70'
                  )}
                >
                  {key === 'features'     ? (isAr ? 'المميزات'   : 'Features')     :
                   key === 'solutions'    ? (isAr ? 'الحلول'      : 'Solutions')    :
                   key === 'integrations' ? (isAr ? 'التكاملات'   : 'Integrations') :
                                           (isAr ? 'الموارد'      : 'Resources')}
                  <ChevronDown size={13} className={clsx('transition-transform duration-200', activeMenu === key && 'rotate-180')} />
                </button>
              ))}
              <button
                onClick={openModal}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-[#25A4E8] hover:bg-blue-50/70 transition-colors">
                {isAr ? 'الأسعار' : 'Pricing'}
              </button>
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-2.5">
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                <button onClick={() => setLang('en')} className={clsx('px-3 py-1.5 rounded-md text-xs font-bold transition-all', lang === 'en' ? 'bg-white text-[#25A4E8] shadow-sm' : 'text-slate-500 hover:text-slate-700')}>EN</button>
                <button onClick={() => setLang('ar')} className={clsx('px-3 py-1.5 rounded-md text-xs font-bold transition-all', lang === 'ar' ? 'bg-white text-[#25A4E8] shadow-sm' : 'text-slate-500 hover:text-slate-700')}>AR</button>
              </div>
              <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-[#25A4E8] transition-colors px-2">
                {isAr ? 'تسجيل الدخول' : 'Sign in'}
              </Link>
              <button onClick={openModal} className="px-5 py-2.5 bg-[#25A4E8] text-white text-sm font-bold rounded-xl hover:bg-[#1A8FD1] transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.03]">
                {isAr ? 'احجز عرضاً' : 'Book a Demo'}
              </button>
            </div>

            {/* Mobile: language switcher (burger lives in the bottom nav) */}
            <div className="lg:hidden flex items-center bg-slate-100 rounded-lg p-0.5">
              <button onClick={() => setLang('en')} className={clsx('px-3 py-1.5 rounded-md text-xs font-bold transition-all', lang === 'en' ? 'bg-white text-[#25A4E8] shadow-sm' : 'text-slate-500')}>EN</button>
              <button onClick={() => setLang('ar')} className={clsx('px-3 py-1.5 rounded-md text-xs font-bold transition-all', lang === 'ar' ? 'bg-white text-[#25A4E8] shadow-sm' : 'text-slate-500')}>AR</button>
            </div>
          </div>
        </div>

        {/* ── Mega Menu panel ─────────────────────────────── */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease }}
              className="hidden lg:block absolute top-full inset-x-0 bg-white border-b border-slate-100 shadow-2xl shadow-slate-900/10"
              onMouseEnter={() => openMenu(activeMenu)}
              onMouseLeave={closeMenu}
            >
              <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">

                {/* ── FEATURES ── */}
                {activeMenu === 'features' && (
                  <div className="flex gap-5">

                    {/* LEFT: Category selector */}
                    <div className="w-[200px] shrink-0">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400 px-3 mb-3">
                        {isAr ? 'الفئات' : 'Categories'}
                      </p>
                      <div className="space-y-0.5">
                        {visibleFeatureCats.map((cat, i) => (
                          <button
                            key={cat.label}
                            onMouseEnter={() => setActiveCatIdx(i)}
                            onClick={() => setActiveCatIdx(i)}
                            className={clsx(
                              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-start transition-all',
                              activeCatIdx === i
                                ? 'bg-white shadow-sm border border-slate-100/80 ring-1 ring-slate-100'
                                : 'hover:bg-slate-50/80 border border-transparent'
                            )}
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all"
                              style={{ backgroundColor: activeCatIdx === i ? `${cat.color}18` : `${cat.color}10` }}
                            >
                              <cat.icon size={15} style={{ color: cat.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={clsx('text-[12.5px] font-bold leading-tight truncate',
                                activeCatIdx === i ? 'text-[#0F172A]' : 'text-slate-500')}>
                                {cat.label}
                              </p>
                              <p className="text-[10.5px] text-slate-400 mt-0.5 leading-tight truncate">{cat.desc}</p>
                            </div>
                            {activeCatIdx === i && (
                              <ArrowRight size={12} className="text-[#25A4E8] shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* CENTER: Features for active category */}
                    <div className="flex-1 min-w-0">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeCatIdx}
                          initial={{ opacity: 0, x: isAr ? -10 : 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: isAr ? 10 : -10 }}
                          transition={{ duration: 0.15, ease }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <p
                              className="text-[10px] font-extrabold uppercase tracking-[0.12em]"
                              style={{ color: activeCat.color }}
                            >
                              {activeCat.label}
                            </p>
                            <Link
                              href="/features"
                              className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-[#25A4E8] transition-colors"
                            >
                              {isAr ? 'جميع المميزات' : 'All features'}
                              <ArrowRight size={10} />
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mb-5">
                            {activeCat.items.map((item) => (
                              <Link
                                key={item.slug}
                                href={resolveFeatureHref(item)!}
                                className="group flex items-start gap-3 p-3.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                              >
                                {(item as { logo?: string }).logo ? (
                                  /* Wider than tall: holds both square app-icons and 2.6:1
                                     wordmarks (Tuya/TTLock), which a square tile shrank badly. */
                                  <div className="w-20 h-16 rounded-xl flex items-center justify-center shrink-0 bg-white border border-slate-100 p-1.5 transition-all group-hover:scale-110">
                                    <Image src={(item as { logo?: string }).logo!} alt={item.label} width={68} height={52} className="w-full h-full object-contain" />
                                  </div>
                                ) : (
                                  <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                                    style={{ backgroundColor: `${activeCat.color}14` }}
                                  >
                                    <item.icon size={16} style={{ color: activeCat.color }} />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <p className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors leading-tight">
                                      {item.label}
                                    </p>
                                    {item.isNew && (
                                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600 uppercase tracking-wide shrink-0">
                                        NEW
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Bottom CTA bar */}
                          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                            <p className="text-[11.5px] text-slate-400">
                              {isAr ? 'هل تحتاج حلاً مختلفاً؟' : 'Need a different solution?'}
                            </p>
                            <Link
                              href="/demo"
                              className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#25A4E8] bg-blue-50 px-3.5 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                            >
                              {isAr ? 'تحدث مع المبيعات' : 'Talk to sales'}
                              <ArrowRight size={10} />
                            </Link>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* RIGHT: Promo */}
                    <PromoPanel isAr={isAr} />
                  </div>
                )}

                {/* ── SOLUTIONS ── */}
                {activeMenu === 'solutions' && (
                  <div className="flex gap-0">

                    {/* COL 1 — By Portfolio Size */}
                    <div className="flex-1 min-w-0 px-5">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400 mb-4">
                        {isAr ? 'حسب حجم المحفظة' : 'By Portfolio Size'}
                      </p>
                      <div className="space-y-1">
                        {[
                          { slug: 'vacation-rental-hosts',      icon: Users,     color: '#25A4E8', en: 'Independent Host',    ar: 'مضيف مستقل',          desc_en: 'Perfect for 1–7 properties',        desc_ar: 'مثالي لـ 1–7 عقارات' },
                          { slug: 'property-managers',          icon: Building2, color: '#7C69E8', en: 'Property Manager',    ar: 'مدير عقارات',          desc_en: 'Scale from 8 to 50+ units',         desc_ar: 'من 8 إلى 50+ وحدة' },
                          { slug: 'multi-owner-operators',      icon: Layers,    color: '#10B981', en: 'Multi-Owner Operator',ar: 'مشغّل متعدد الملاك',   desc_en: 'Manage portfolios across owners',   desc_ar: 'إدارة محافظ متعددة الملاك' },
                          { slug: 'hotels-serviced-apartments', icon: Cpu,       color: '#F59E0B', en: 'Enterprise',          ar: 'مؤسسات',               desc_en: '50+ units, dedicated support',      desc_ar: '50+ وحدة، دعم مخصص' },
                        ].map((item) => (
                          <Link
                            key={item.slug}
                            href={`/solutions/${item.slug}`}
                            className="group flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${item.color}14` }}>
                              <item.icon size={14} style={{ color: item.color }} />
                            </div>
                            <div>
                              <p className="text-[12.5px] font-bold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors leading-tight">
                                {isAr ? item.ar : item.en}
                              </p>
                              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                                {isAr ? item.desc_ar : item.desc_en}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch mx-1" />

                    {/* COL 2 — By Need */}
                    <div className="flex-1 min-w-0 px-5">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400 mb-4">
                        {isAr ? 'حسب الحاجة' : 'By Need'}
                      </p>
                      <div className="space-y-1">
                        {[
                          { slug: 'vacation-rental-hosts',      icon: Zap,           color: '#25A4E8', en: 'New to PMS',              ar: 'جديد على نظام PMS',          desc_en: 'First time using property software',   desc_ar: 'أول مرة تستخدم برنامج عقاري' },
                          { slug: 'property-managers',          icon: RefreshCw,     color: '#7C69E8', en: 'Switching Platforms',     ar: 'التحويل من منصة أخرى',       desc_en: 'Migrate from another PMS tool',        desc_ar: 'انتقل من أداة PMS أخرى' },
                          { slug: 'multi-owner-operators',      icon: Users,         color: '#10B981', en: 'Managing for Owners',     ar: 'إدارة لصالح ملاك',           desc_en: 'Run properties on behalf of owners',   desc_ar: 'إدارة العقارات نيابةً عن الملاك' },
                          { slug: 'hotels-serviced-apartments', icon: TrendingUp,    color: '#F59E0B', en: 'Growing Direct Bookings', ar: 'زيادة الحجوزات المباشرة',   desc_en: 'Cut OTA commissions with your brand',  desc_ar: 'خفّض عمولات OTA بعلامتك التجارية' },
                        ].map((item) => (
                          <Link
                            key={item.slug}
                            href={`/solutions/${item.slug}`}
                            className="group flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${item.color}14` }}>
                              <item.icon size={14} style={{ color: item.color }} />
                            </div>
                            <div>
                              <p className="text-[12.5px] font-bold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors leading-tight">
                                {isAr ? item.ar : item.en}
                              </p>
                              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                                {isAr ? item.desc_ar : item.desc_en}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch mx-1" />

                    {/* COL 3 — By Property Type */}
                    <div className="flex-1 min-w-0 px-5">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400 mb-4">
                        {isAr ? 'حسب نوع العقار' : 'By Property Type'}
                      </p>
                      <div className="space-y-1">
                        {[
                          { slug: 'vacation-rental-hosts',      icon: Globe,      color: '#25A4E8', en: 'Vacation Rentals',          ar: 'الإيجارات السياحية',       desc_en: 'Chalets, villas & holiday homes',  desc_ar: 'شاليهات وفلل وبيوت عطلات' },
                          { slug: 'hotels-serviced-apartments', icon: Building2,  color: '#7C69E8', en: 'Serviced Apartments',        ar: 'الشقق الفندقية',           desc_en: 'Extended stays & furnished units', desc_ar: 'إقامات طويلة ووحدات مفروشة' },
                          { slug: 'property-managers',          icon: Star,       color: '#F59E0B', en: 'Villas & Luxury Homes',      ar: 'الفلل والمنازل الفاخرة',   desc_en: 'Premium properties, premium tools',desc_ar: 'عقارات راقية وأدوات متقدمة' },
                          { slug: 'hotels-serviced-apartments', icon: Layers,     color: '#10B981', en: 'Hotels & Boutique',          ar: 'الفنادق والبوتيك',         desc_en: 'Full hotel operations suite',      desc_ar: 'منظومة عمليات فندقية كاملة' },
                        ].map((item, i) => (
                          <Link
                            key={i}
                            href={`/solutions/${item.slug}`}
                            className="group flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${item.color}14` }}>
                              <item.icon size={14} style={{ color: item.color }} />
                            </div>
                            <div>
                              <p className="text-[12.5px] font-bold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors leading-tight">
                                {isAr ? item.ar : item.en}
                              </p>
                              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                                {isAr ? item.desc_ar : item.desc_en}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch mx-1" />

                    {/* RIGHT: Promo */}
                    <div className="ps-4">
                      <PromoPanel isAr={isAr} />
                    </div>
                  </div>
                )}

                {/* ── INTEGRATIONS ── */}
                {activeMenu === 'integrations' && (
                  <div className="flex gap-5">

                    {/* LEFT: 7 category tabs — hover to filter center */}
                    <div className="w-[210px] shrink-0">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400 px-3 mb-3">
                        {isAr ? 'نوع التكامل' : 'Integration type'}
                      </p>
                      <div className="space-y-0.5">
                        {INTG_CATS.map((cat, i) => (
                          <button
                            key={cat.label_en}
                            onMouseEnter={() => setActiveIntgIdx(i)}
                            onClick={() => setActiveIntgIdx(i)}
                            className={clsx(
                              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-start transition-all',
                              activeIntgIdx === i
                                ? 'bg-white shadow-sm border border-slate-100/80 ring-1 ring-slate-100'
                                : 'hover:bg-slate-50/80 border border-transparent'
                            )}
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${cat.color}14` }}>
                              <cat.icon size={14} style={{ color: cat.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={clsx('text-[12.5px] font-bold leading-tight truncate',
                                activeIntgIdx === i ? 'text-[#0F172A]' : 'text-slate-500')}>
                                {isAr ? cat.label_ar : cat.label_en}
                              </p>
                              <p className="text-[10.5px] text-slate-400 mt-0.5 leading-tight truncate">
                                {isAr ? cat.desc_ar : cat.desc_en}
                              </p>
                            </div>
                            {activeIntgIdx === i && <ArrowRight size={12} className="text-[#25A4E8] shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* CENTER: Filtered items for selected category */}
                    <div className="flex-1 min-w-0">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeIntgIdx}
                          initial={{ opacity: 0, x: isAr ? -10 : 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: isAr ? 10 : -10 }}
                          transition={{ duration: 0.15, ease }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em]"
                              style={{ color: INTG_CATS[activeIntgIdx].color }}>
                              {isAr ? INTG_CATS[activeIntgIdx].label_ar : INTG_CATS[activeIntgIdx].label_en}
                            </p>
                            <Link href="/integrations"
                              className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-[#25A4E8] transition-colors">
                              {isAr ? 'جميع التكاملات' : 'View all'} <ArrowRight size={10} />
                            </Link>
                          </div>

                          <div className="grid grid-cols-4 gap-2 mb-4">
                            {INTEGRATIONS
                              .filter(intg => INTG_CATS[activeIntgIdx].slugs.includes(intg.slug))
                              .map((intg) => (
                                <Link key={intg.slug} href={`/integrations/${intg.slug}`}
                                  className="group flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border border-slate-100 bg-white hover:border-[#25A4E8]/30 hover:bg-blue-50/40 hover:shadow-md transition-all text-center">
                                  <div className="w-16 h-16 rounded-2xl border border-slate-100 bg-white flex items-center justify-center shrink-0 p-2.5 shadow-sm group-hover:shadow-md transition-shadow">
                                    {intg.logo
                                      ? <Image src={intg.logo} alt={intg.en} width={56} height={56} className="object-contain w-full h-full" />
                                      : <span className="text-[14px] font-extrabold text-slate-500 leading-tight">{intg.en.slice(0,3).toUpperCase()}</span>
                                    }
                                  </div>
                                  <div>
                                    <p className="text-[12px] font-bold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors leading-tight">
                                      {isAr ? intg.ar : intg.en}
                                    </p>
                                    <span className={`text-[10px] font-semibold mt-0.5 inline-block ${intg.badge_en === 'Soon' ? 'text-amber-500' : 'text-slate-400'}`}>
                                      {isAr ? intg.badge_ar : intg.badge_en}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                          </div>

                          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                            <p className="text-[11.5px] text-slate-400">
                              {isAr ? 'تكامل مفقود؟' : 'Missing an integration?'}
                            </p>
                            <button onClick={openModal}
                              className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#25A4E8] bg-blue-50 px-3.5 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                              {isAr ? 'اطلب تكاملاً' : 'Request one'} <ArrowRight size={10} />
                            </button>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* RIGHT: Promo */}
                    <PromoPanel isAr={isAr} />
                  </div>
                )}

                {/* ── RESOURCES ── */}
                {activeMenu === 'resources' && (
                  <div className="flex gap-5">
                    {/* LEFT: Resource category labels */}
                    <div className="w-[180px] shrink-0">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400 px-3 mb-3">
                        {isAr ? 'نوع المورد' : 'Resource type'}
                      </p>
                      <div className="space-y-0.5">
                        {[
                          { label_en: 'Learn',   label_ar: 'تعلّم',   icon: BookOpen, color: '#25A4E8' },
                          { label_en: 'Support', label_ar: 'الدعم',   icon: LifeBuoy, color: '#7C69E8' },
                          { label_en: "What's new", label_ar: 'الجديد', icon: Zap,    color: '#F59E0B' },
                        ].map((cat, i) => (
                          <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100 transition-all">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}14` }}>
                              <cat.icon size={13} style={{ color: cat.color }} />
                            </div>
                            <p className="text-[12px] font-semibold text-slate-600">{isAr ? cat.label_ar : cat.label_en}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* CENTER: Resource links */}
                    <div className="flex-1">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400 mb-4">
                        {isAr ? 'موارد ومساعدة' : 'Resources & support'}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {resources.map((res) => (
                          <Link key={res.href} href={res.href}
                            className="group flex items-start gap-3 p-3.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors shrink-0">
                              <res.icon size={16} className="text-[#25A4E8]" />
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors leading-tight">{res.label}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{res.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* RIGHT: Promo */}
                    <PromoPanel isAr={isAr} />
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile Bottom Nav ──────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/97 backdrop-blur-xl border-t border-slate-100 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-stretch justify-around px-1 py-1.5">
          {bottomNav.map((item) => {
            const cls = clsx(
              'flex-1 flex flex-col items-center justify-center gap-1 py-1.5 rounded-lg transition-colors',
              item.active ? 'text-[#25A4E8]' : 'text-slate-500'
            );
            const inner = (
              <>
                <item.icon size={21} strokeWidth={item.active ? 2.4 : 2} />
                <span className={clsx('text-[10px] leading-none', item.active && 'font-bold')}>{isAr ? item.ar : item.en}</span>
              </>
            );
            return item.onClick ? (
              <button key={item.en} onClick={item.onClick} className={cls}>{inner}</button>
            ) : (
              <Link key={item.en} href={item.href!} className={cls}>{inner}</Link>
            );
          })}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={isAr ? 'القائمة' : 'Menu'}
            className={clsx(
              'flex-1 flex flex-col items-center justify-center gap-1 py-1.5 rounded-lg transition-colors',
              mobileOpen ? 'text-[#25A4E8]' : 'text-slate-500'
            )}
          >
            {mobileOpen ? <X size={21} strokeWidth={2.4} /> : <Menu size={21} strokeWidth={2} />}
            <span className={clsx('text-[10px] leading-none', mobileOpen && 'font-bold')}>{isAr ? 'القائمة' : 'Menu'}</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: isAr ? '-100%' : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isAr ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-white lg:hidden overflow-y-auto"
          >
            <div className="p-5 pt-20 pb-28">
              {/* Accordion nav */}
              {(['features', 'solutions', 'integrations', 'resources'] as MenuKey[]).map((key) => (
                <div key={key} className="border-b border-slate-100 pb-2 mb-2">
                  <button
                    className="flex items-center justify-between w-full py-3 text-sm font-bold text-[#0F172A]"
                    onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                  >
                    {key === 'features'     ? (isAr ? 'المميزات'   : 'Features')     :
                     key === 'solutions'    ? (isAr ? 'الحلول'      : 'Solutions')    :
                     key === 'integrations' ? (isAr ? 'التكاملات'   : 'Integrations') :
                                             (isAr ? 'الموارد'      : 'Resources')}
                    <ChevronDown size={16} className={clsx('transition-transform duration-200', mobileExpanded === key && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === key && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                        <div className="pb-2 space-y-0.5">
                          {key === 'features' && (
                            <>
                              {visibleFeatureCats.map(cat => {
                                const catOpen = mobileFeatureCat === cat.label;
                                return (
                                  <div key={cat.label} className="rounded-lg overflow-hidden">
                                    <button
                                      onClick={() => setMobileFeatureCat(catOpen ? null : cat.label)}
                                      className="flex items-center gap-3 w-full px-3 py-2.5 text-start"
                                    >
                                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}18` }}>
                                        <cat.icon size={15} style={{ color: cat.color }} />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-bold text-[#0F172A] leading-tight">{cat.label}</p>
                                        <p className="text-[10.5px] text-slate-400 leading-tight truncate">{cat.desc}</p>
                                      </div>
                                      <ChevronDown size={15} className={clsx('text-slate-400 shrink-0 transition-transform duration-200', catOpen && 'rotate-180')} />
                                    </button>
                                    <AnimatePresence>
                                      {catOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                                          <div className={clsx('pb-1 space-y-0.5', isAr ? 'pr-3' : 'pl-3')}>
                                            {cat.items.map(item => (
                                              <Link key={item.slug} href={resolveFeatureHref(item)!} className="flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-blue-50">
                                                {(item as { logo?: string }).logo ? (
                                                  <div className="w-16 h-14 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-white border border-slate-100 p-1.5">
                                                    <Image src={(item as { logo?: string }).logo!} alt={item.label} width={52} height={44} className="w-full h-full object-contain" />
                                                  </div>
                                                ) : (
                                                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${cat.color}14` }}>
                                                    <item.icon size={13} style={{ color: cat.color }} />
                                                  </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                  <div className="flex items-center gap-1.5">
                                                    <p className="text-[13px] font-semibold text-slate-700 leading-tight">{item.label}</p>
                                                    {item.isNew && <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600 uppercase shrink-0">NEW</span>}
                                                  </div>
                                                  <p className="text-[10.5px] text-slate-400 leading-tight truncate">{(item as { desc?: string }).desc}</p>
                                                </div>
                                              </Link>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                              <Link href="/features" className="flex items-center gap-1.5 px-3 py-2.5 text-[12px] font-bold text-[#25A4E8]">
                                {isAr ? 'جميع المميزات' : 'All features'}
                                <ArrowRight size={12} className={isAr ? 'rotate-180' : ''} />
                              </Link>
                            </>
                          )}
                          {key === 'solutions' && SOLUTIONS.map(s => (
                            <Link key={s.slug} href={`/solutions/${s.slug}`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-sm text-slate-700 font-medium">
                              <s.icon size={15} style={{ color: s.color }} className="shrink-0" />{isAr ? s.ar : s.en}
                            </Link>
                          ))}
                          {key === 'integrations' && INTEGRATIONS.map(intg => (
                            <Link key={intg.slug} href={`/integrations/${intg.slug}`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-sm text-slate-700 font-medium">
                              <div className="w-8 h-8 rounded-md border border-slate-100 bg-white flex items-center justify-center shrink-0 p-1">
                                {intg.logo
                                  ? <Image src={intg.logo} alt={intg.en} width={28} height={28} className="object-contain w-full h-full" />
                                  : <span className="text-[9px] font-extrabold text-slate-500">{intg.en.slice(0,3).toUpperCase()}</span>
                                }
                              </div>
                              {isAr ? intg.ar : intg.en}
                            </Link>
                          ))}
                          {key === 'resources' && resources.map(res => (
                            <Link key={res.href} href={res.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-sm text-slate-700 font-medium">
                              <res.icon size={15} className="text-[#25A4E8] shrink-0" />{res.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <button onClick={() => { openModal(); setMobileOpen(false); }}
                className="w-full text-start py-3 text-sm font-bold text-[#0F172A] border-b border-slate-100 mb-6">
                {isAr ? 'الأسعار' : 'Pricing'}
              </button>

              <div className="flex flex-col gap-3">
                <Link href="/login" className="block text-center py-3 border-2 border-[#25A4E8] text-[#25A4E8] font-bold rounded-xl text-sm">
                  {isAr ? 'تسجيل الدخول' : 'Sign in'}
                </Link>
                <button onClick={() => { openModal(); setMobileOpen(false); }}
                  className="block w-full text-center py-3 bg-[#25A4E8] text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-500/20">
                  {isAr ? 'احجز عرضاً تجريبياً' : 'Book a Demo'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
