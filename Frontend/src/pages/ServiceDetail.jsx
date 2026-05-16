// src/pages/ServiceDetail.jsx
import { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import {
  CheckCircle, ArrowRight, ArrowLeft, Send,
  Phone, MessageCircle,
  Star, Shield, Sparkles, Clock, ZoomIn,
  X, ChevronLeft, ChevronRight
} from 'lucide-react';
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import SectionHeading from '@components/ui/SectionHeading';
import Card from '@components/ui/Card';
import Button from '@components/ui/Button';
import CTABanner from '@components/ui/CTABanner';
import { useEnquiry } from '@hooks/useEnquiry';
import servicesData from '@data/services.json';
import { COMPANY } from '@utils/constants';
import { cn } from '../utils/helpers';

const iconMap = {
  home: 'Home', building: 'Building2', grid3x3: 'Grid3X3',
  layers: 'Layers', chefHat: 'ChefHat', paintbrush: 'Paintbrush',
  wrench: 'Wrench', doorOpen: 'DoorOpen', zap: 'Zap',
};

// ─── Sub-section data ─────────────────────────────────────────────────────────

const furnitureSubSections = [
  {
    id: 'modular-kitchen-furniture',
    title: 'Modular Kitchen',
    icon: 'ChefHat',
    description: 'Factory-engineered modular kitchens with premium finishes, soft-close hardware, and intelligent storage designed for Indian cooking.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=500&q=80',
        alt: 'Modern modular kitchen with island',
      },
      {
        src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=500&q=80',
        alt: 'Open plan kitchen with white cabinets',
      },
      {
        src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=500&q=80',
        alt: 'Contemporary handleless kitchen design',
      },
      {
        src: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=500&q=80',
        alt: 'Sleek modular kitchen with quartz countertop',
      },
      {
        src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=500&q=80',
        alt: 'Modern kitchen with premium appliances',
      },
    ],
  },
  {
    id: 'modular-wardrobe',
    title: 'Modular Wardrobe',
    icon: 'Package',
    description: 'Custom modular wardrobes maximizing every inch of space with smart compartments, soft-close shutters, and elegant finishes.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=500&q=80',
        alt: 'Floor-to-ceiling modular wardrobe',
      },
      {
        src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=500&q=80',
        alt: 'Walk-in wardrobe with LED lighting',
      },
      {
        src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=500&q=80',
        alt: 'Organized wardrobe interior with drawers',
      },
      {
        src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=500&q=80',
        alt: 'Sliding door wardrobe bedroom',
      },
      {
        src: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?auto=format&fit=crop&w=500&q=80',
        alt: 'Built-in wardrobe with mirror panel',
      },
    ],
  },
  {
    id: 'modular-furniture',
    title: 'Modular Furniture',
    icon: 'Armchair',
    description: 'Versatile modular furniture systems — sofas, shelving, beds and storage units crafted for modern living with adaptable configurations.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80',
        alt: 'Modern sectional sofa living room',
      },
      {
        src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80',
        alt: 'Contemporary living room furniture set',
      },
      {
        src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=500&q=80',
        alt: 'Modular shelving and storage unit',
      },
      {
        src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80',
        alt: 'Modern bedroom furniture with storage',
      },
      {
        src: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=500&q=80',
        alt: 'Modular bookcase and display unit',
      },
    ],
  },
  {
    id: 'modular-workstation',
    title: 'Modular Workstation',
    icon: 'Monitor',
    description: 'Ergonomic modular workstations for home offices and corporate spaces — designed for productivity, cable management, and comfort.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=500&q=80',
        alt: 'Modern home office dual monitor setup',
      },
      {
        src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=500&q=80',
        alt: 'Open plan office workstation design',
      },
      {
        src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=500&q=80',
        alt: 'Corporate modular desk arrangement',
      },
      {
        src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=500&q=80',
        alt: 'Collaborative office workspace pods',
      },
      {
        src: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=500&q=80',
        alt: 'Minimalist modern workstation setup',
      },
    ],
  },
  {
    id: 'customize-furniture',
    title: 'Customize Furniture',
    icon: 'Pencil',
    description: 'Bespoke furniture crafted to your exact specifications — from statement dining tables to hand-carved headboards and one-of-a-kind accent pieces.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=500&q=80',
        alt: 'Custom solid wood dining table',
      },
      {
        src: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=500&q=80',
        alt: 'Bespoke upholstered headboard',
      },
      {
        src: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=500&q=80',
        alt: 'Custom accent chair with premium fabric',
      },
      {
        src: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=500&q=80',
        alt: 'Custom TV unit with storage',
      },
      {
        src: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=500&q=80',
        alt: 'Hand-crafted wooden sideboard',
      },
    ],
  },
];

const falseCeilingSubSections = [
  {
    id: 'gypsum-false-ceiling',
    title: 'Gypsum False Ceiling',
    icon: 'Square',
    description: 'Smooth, paintable gypsum board ceilings ideal for living rooms and bedrooms — perfect for integrated cove lighting and modern profiles.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80',
        alt: 'Gypsum false ceiling with cove LED lighting',
      },
      {
        src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80',
        alt: 'Modern gypsum ceiling living room',
      },
      {
        src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
        alt: 'Designer gypsum ceiling with recessed lights',
      },
      {
        src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80',
        alt: 'Bedroom gypsum false ceiling design',
      },
      {
        src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80',
        alt: 'Office gypsum ceiling with spotlights',
      },
    ],
  },
  {
    id: 'pvc-wpc-false-ceiling',
    title: 'PVC / WPC False Ceiling',
    icon: 'LayoutGrid',
    description: 'Moisture-resistant PVC and WPC panel ceilings — ideal for kitchens, bathrooms, and high-humidity areas with easy cleaning and long life.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?auto=format&fit=crop&w=500&q=80',
        alt: 'PVC panel ceiling installation',
      },
      {
        src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=500&q=80',
        alt: 'WPC false ceiling bathroom',
      },
      {
        src: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=500&q=80',
        alt: 'Modern PVC ceiling panels kitchen',
      },
      {
        src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=500&q=80',
        alt: 'PVC ceiling with integrated lighting strips',
      },
      {
        src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80',
        alt: 'WPC panel ceiling modern interior',
      },
    ],
  },
  {
    id: 'wooden-false-ceiling',
    title: 'Wooden False Ceiling',
    icon: 'AlignJustify',
    description: 'Natural wood and engineered wood panel ceilings that add warmth, texture, and a luxury feel to any residential or hospitality space.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80',
        alt: 'Wooden slat ceiling modern living room',
      },
      {
        src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80',
        alt: 'Timber panel false ceiling design',
      },
      {
        src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=500&q=80',
        alt: 'Engineered wood ceiling with pendant lights',
      },
      {
        src: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=500&q=80',
        alt: 'Rustic wood beam ceiling interior',
      },
      {
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=500&q=80',
        alt: 'Warm wooden ceiling hospitality space',
      },
    ],
  },
  {
    id: 'stretch-false-ceiling',
    title: 'Stretch False Ceiling',
    icon: 'Maximize2',
    description: 'High-gloss or matte stretch membrane ceilings available in 100+ colours — seamless finish, moisture-proof, and ready for backlit printing.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80',
        alt: 'High-gloss stretch ceiling office',
      },
      {
        src: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=500&q=80',
        alt: 'Backlit stretch membrane ceiling',
      },
      {
        src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=500&q=80',
        alt: 'Coloured stretch false ceiling design',
      },
      {
        src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=500&q=80',
        alt: 'Stretch ceiling hotel lobby installation',
      },
      {
        src: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=500&q=80',
        alt: 'Matte white stretch membrane ceiling',
      },
    ],
  },
];

const flooringSubSections = [
  {
    id: 'tiles-marble-flooring',
    title: 'Tiles / Marble Flooring',
    icon: 'Grid3X3',
    description: 'Premium ceramic, porcelain, and natural marble tiles installed with precision — available in large-format slabs, mosaics, and custom patterns.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=500&q=80',
        alt: 'White marble flooring living room',
      },
      {
        src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=500&q=80',
        alt: 'Large format porcelain tile floor',
      },
      {
        src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=500&q=80',
        alt: 'Herringbone tile pattern flooring',
      },
      {
        src: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=500&q=80',
        alt: 'Natural marble bathroom flooring',
      },
      {
        src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80',
        alt: 'Premium tile flooring in hall',
      },
    ],
  },
  {
    id: 'italian-flooring',
    title: 'Italian Flooring',
    icon: 'Star',
    description: 'Authentic Italian marble and stone — Statuario, Calacatta, Carrara, and Botticino — imported and installed by expert craftsmen for timeless luxury.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80',
        alt: 'Calacatta marble flooring luxury home',
      },
      {
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80',
        alt: 'Statuario marble with brass inlay',
      },
      {
        src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80',
        alt: 'Luxury Italian stone flooring villa',
      },
      {
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=500&q=80',
        alt: 'Carrara white marble floor',
      },
      {
        src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80',
        alt: 'Premium Italian marble foyer',
      },
    ],
  },
  {
    id: 'wooden-flooring',
    title: 'Wooden Flooring',
    icon: 'AlignJustify',
    description: 'Solid hardwood, engineered wood, and laminate flooring in oak, walnut, teak, and maple — warm underfoot and beautiful in any interior.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1562113530-57ba467cea38?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1562113530-57ba467cea38?auto=format&fit=crop&w=500&q=80',
        alt: 'Oak engineered hardwood flooring',
      },
      {
        src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=500&q=80',
        alt: 'Walnut hardwood bedroom floor',
      },
      {
        src: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?auto=format&fit=crop&w=500&q=80',
        alt: 'Chevron pattern wooden flooring',
      },
      {
        src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=500&q=80',
        alt: 'Light maple laminate floor',
      },
      {
        src: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?auto=format&fit=crop&w=500&q=80',
        alt: 'Teak wood plank flooring',
      },
    ],
  },
  {
    id: 'epoxy-flooring',
    title: 'Epoxy Flooring',
    icon: 'Droplets',
    description: 'High-performance seamless epoxy coatings for garages, warehouses, commercial kitchens and showrooms — durable, chemical-resistant, and stunning.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=500&q=80',
        alt: 'Metallic epoxy flooring garage',
      },
      {
        src: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80',
        alt: 'Commercial epoxy floor coating',
      },
      {
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80',
        alt: 'Self-levelling epoxy showroom floor',
      },
      {
        src: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=500&q=80',
        alt: 'Grey epoxy industrial flooring',
      },
      {
        src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=90',
        thumb: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=500&q=80',
        alt: '3D epoxy decorative floor',
      },
    ],
  },
];

// Map service IDs to sub-sections
const serviceSubSections = {
  'residential-interior': {
    sectionLabel: 'Furniture Works',
    sectionDesc: 'From modular kitchens to bespoke statement pieces — every furniture solution tailored for your home.',
    icon: 'Armchair',
    items: furnitureSubSections,
  },
  'false-ceiling': {
    sectionLabel: 'False Ceiling Types',
    sectionDesc: 'Choose from our wide range of ceiling systems — each engineered for aesthetics, acoustics, and longevity.',
    icon: 'Layers',
    items: falseCeilingSubSections,
  },
  'tile-flooring': {
    sectionLabel: 'Flooring Solutions',
    sectionDesc: 'Premium flooring options from classic marble to modern epoxy — installed with expert precision.',
    icon: 'Grid3X3',
    items: flooringSubSections,
  },
};

// ─── Extended service data ────────────────────────────────────────────────────

const serviceExtendedData = {
  'residential-interior': {
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=90',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80', alt: 'Luxury residential interior living room' },
      { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80', alt: 'Modern bedroom interior design' },
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80', alt: 'Contemporary dining room design' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', alt: 'Premium home interior design' },
    ],
    process: [
      { step: '01', title: 'Consultation', desc: 'We visit your home, understand your lifestyle, preferences, and budget.' },
      { step: '02', title: '3D Design', desc: 'Our designers create detailed 3D renderings and floor plans for your approval.' },
      { step: '03', title: 'Material Selection', desc: 'Choose from our curated collection of premium materials, colors, and finishes.' },
      { step: '04', title: 'Execution', desc: 'Our skilled craftsmen execute the design with precision and quality.' },
      { step: '05', title: 'Quality Check', desc: 'Rigorous inspection of every detail before the grand reveal.' },
      { step: '06', title: 'Handover', desc: 'Final walkthrough, documentation, and joyful handover of your dream home.' },
    ],
    benefits: [
      'Completely personalized designs reflecting your taste',
      'Premium branded materials with warranty',
      'Dedicated project manager assigned',
      'Regular progress updates with photos',
      'On-time completion guarantee',
      'Post-project maintenance support',
      '3D visualization before execution',
      'Budget-friendly options available',
    ],
    faqs: [
      { q: 'How much does residential interior design cost?', a: 'Our residential packages start from ₹8 lakhs for a 2BHK. The final cost depends on the scope, materials, and customization level. We offer packages for every budget.' },
      { q: 'Do you provide 3D designs before execution?', a: 'Yes! We provide detailed 3D renderings and virtual walkthroughs so you can visualize the final result before we begin execution.' },
      { q: 'What is the timeline for a complete home interior?', a: 'A typical 2-3 BHK takes 45-60 days. Larger homes may take 60-90 days. We provide a detailed timeline during planning.' },
      { q: 'Can I choose my own materials?', a: "Absolutely! While we recommend premium materials, you're free to choose any material. We can also source specific materials on request." },
    ],
  },
  'commercial-interior': {
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=90',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80', alt: 'Modern corporate office interior' },
      { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80', alt: 'Open plan commercial space' },
      { src: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80', alt: 'Retail store interior design' },
      { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', alt: 'Professional commercial workspace' },
    ],
    process: [
      { step: '01', title: 'Brand Analysis', desc: 'Understanding your brand, business goals, and spatial requirements.' },
      { step: '02', title: 'Space Planning', desc: 'Optimizing layout for workflow, customer experience, and efficiency.' },
      { step: '03', title: 'Design Development', desc: 'Creating detailed designs with brand integration and compliance.' },
      { step: '04', title: 'Execution', desc: 'Professional execution with minimal disruption to your business.' },
    ],
    benefits: ['Brand-aligned design', 'Ergonomic workspace planning', 'Compliance with safety standards', 'Minimal business disruption', 'Energy-efficient solutions', 'Scalable designs'],
    faqs: [
      { q: 'Do you work on weekends to minimize disruption?', a: 'Yes, we can schedule work during off-hours and weekends to ensure your business operations continue smoothly.' },
      { q: 'What types of commercial spaces do you design?', a: 'We design offices, retail stores, restaurants, hotels, hospitals, showrooms, co-working spaces, and more.' },
    ],
  },
  'tile-flooring': {
    heroImage: 'https://res.cloudinary.com/doo2og4l3/image/upload/v1778940874/photo-1560185893-a55cbc8c57e8_gyplfz.jpg',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=600&q=80', alt: 'Premium tile flooring installation' },
      { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&q=80', alt: 'Large format porcelain tiles' },
      { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80', alt: 'Designer tile pattern flooring' },
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80', alt: 'Marble tile flooring luxury' },
    ],
    process: [
      { step: '01', title: 'Site Assessment', desc: 'Evaluating existing flooring and subfloor conditions.' },
      { step: '02', title: 'Material Selection', desc: 'Choosing the right tile type, pattern, and finish for your space.' },
      { step: '03', title: 'Surface Preparation', desc: 'Proper leveling and waterproofing of the subfloor.' },
      { step: '04', title: 'Installation', desc: 'Precision installation with proper grouting and finishing.' },
    ],
    benefits: ['Wide variety of premium tiles', 'Expert precision installation', 'Waterproof solutions', 'Pattern and design consultation', 'Long-lasting quality', 'Easy maintenance options'],
    faqs: [
      { q: 'What tile brands do you work with?', a: 'We work with premium brands like Kajaria, Somany, Johnson, AGL, and also source Italian and Spanish imported tiles.' },
      { q: 'Do you handle removal of existing flooring?', a: 'Yes, we handle complete demolition, removal, disposal, and new installation as a turnkey solution.' },
    ],
  },
  'false-ceiling': {
    heroImage: 'https://res.cloudinary.com/doo2og4l3/image/upload/v1778941005/pexels-photo-18246428_lz5dpy.jpg',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80', alt: 'Gypsum false ceiling with lighting' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', alt: 'Modern false ceiling design' },
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80', alt: 'False ceiling with cove lighting' },
      { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80', alt: 'Luxury false ceiling interior' },
    ],
    process: [
      { step: '01', title: 'Design Selection', desc: 'Choose from our catalog or get a custom ceiling design.' },
      { step: '02', title: 'Framework', desc: 'Installing sturdy metal framework with precise measurements.' },
      { step: '03', title: 'Panel Installation', desc: 'Fitting gypsum/PVC panels with lighting cutouts.' },
      { step: '04', title: 'Finishing', desc: 'Seamless joints, painting, and lighting installation.' },
    ],
    benefits: ['Custom design options', 'Integrated lighting solutions', 'Acoustic insulation', 'Fire-resistant materials', 'Quick installation', 'Low maintenance'],
    faqs: [
      { q: 'Which is better - Gypsum or PVC?', a: 'Gypsum offers a smoother finish and is ideal for living rooms. PVC is waterproof and better for kitchens and bathrooms.' },
      { q: 'Can false ceiling hide AC ducts?', a: 'Yes, false ceilings are perfect for concealing AC ducts, wiring, and plumbing while maintaining a clean look.' },
    ],
  },
  'modular-kitchen': {
    heroImage: 'https://res.cloudinary.com/doo2og4l3/image/upload/v1778941120/pexels-photo-32177983_lhshh2.jpg',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80', alt: 'Modular kitchen with island' },
      { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80', alt: 'Modern kitchen cabinet design' },
      { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&q=80', alt: 'White modular kitchen setup' },
      { src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80', alt: 'Open plan kitchen design' },
    ],
    process: [
      { step: '01', title: 'Kitchen Measurement', desc: 'Precise measurements of your kitchen space.' },
      { step: '02', title: 'Layout Design', desc: 'Designing the optimal layout with 3D visualization.' },
      { step: '03', title: 'Manufacturing', desc: 'Factory-precision manufacturing of all components.' },
      { step: '04', title: 'Installation', desc: 'On-site assembly with appliance integration.' },
    ],
    benefits: ['Factory-precision manufacturing', 'Soft-close mechanisms', 'Optimized storage solutions', 'Premium countertop options', 'Built-in appliance integration', '10-year structural warranty'],
    faqs: [
      { q: 'What countertop material is best?', a: 'Quartz offers the best balance of durability, aesthetics, and maintenance. Granite is a natural option, while Corian allows seamless joints.' },
      { q: 'How long does kitchen installation take?', a: 'Manufacturing takes 15-20 days, and on-site installation takes 5-7 days for a standard kitchen.' },
    ],
  },
  'painting-works': {
    heroImage: 'https://res.cloudinary.com/doo2og4l3/image/upload/v1778941379/photo-1562259949-e8e7689d7828_voijds.jpg',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80', alt: 'Interior painting work in progress' },
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80', alt: 'Finished painting premium interior' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', alt: 'Texture painting wall finish' },
      { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80', alt: 'Designer wall painting work' },
    ],
    process: [
      { step: '01', title: 'Surface Inspection', desc: 'Evaluating wall conditions and repairs needed.' },
      { step: '02', title: 'Color Consultation', desc: 'Expert color matching and theme selection.' },
      { step: '03', title: 'Preparation', desc: 'Wall prep, putty, primer, and masking.' },
      { step: '04', title: 'Painting', desc: 'Multi-coat premium paint application.' },
    ],
    benefits: ['Premium branded paints only', 'Expert color consultation', 'Texture and designer finishes', 'Clean professional work', 'No paint smell guarantee', 'Touch-up support'],
    faqs: [
      { q: 'Which paint brands do you use?', a: 'We exclusively use Asian Paints, Berger, Nerolac, and Dulux premium ranges for lasting quality.' },
      { q: 'How many coats do you apply?', a: 'We apply 1 coat of primer + 2-3 coats of paint for optimal coverage and durability.' },
    ],
  },
  'fabrication-works': {
    heroImage: 'https://res.cloudinary.com/doo2og4l3/image/upload/v1778941438/photo-1504328345606-18bbc8c9d7d1_wowlqs.jpg',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80', alt: 'Steel fabrication workshop' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', alt: 'Custom metal gate fabrication' },
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80', alt: 'Stainless steel railing work' },
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80', alt: 'Metal structure fabrication' },
    ],
    process: [
      { step: '01', title: 'Design & Drawing', desc: 'Technical drawings with measurements.' },
      { step: '02', title: 'Material Sourcing', desc: 'Premium grade MS/SS materials.' },
      { step: '03', title: 'Fabrication', desc: 'Precision cutting, welding, and assembly.' },
      { step: '04', title: 'Installation', desc: 'On-site fitting and finishing.' },
    ],
    benefits: ['Custom designs to specification', 'Premium MS & SS materials', 'Powder-coated finishes', 'Structural engineering support', 'Corrosion-resistant treatments', 'On-site welding capabilities'],
    faqs: [
      { q: 'Do you provide custom gate designs?', a: 'Yes, we design and fabricate custom gates in MS, SS, and wrought iron with any design you envision.' },
      { q: 'What is the warranty on fabrication work?', a: 'We provide a 5-year warranty on structural integrity and 2 years on powder coating.' },
    ],
  },
  'aluminum-glass': {
    heroImage: 'https://res.cloudinary.com/doo2og4l3/image/upload/v1778941529/pexels-photo-8134763_xirfie.jpg',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', alt: 'Aluminum sliding door installation' },
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80', alt: 'Glass partition office design' },
      { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', alt: 'Frameless glass partition' },
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80', alt: 'Modern aluminum door system' },
    ],
    process: [
      { step: '01', title: 'Site Survey', desc: 'Precise measurements and structural assessment.' },
      { step: '02', title: 'Profile Selection', desc: 'Choose aluminum profile type and glass specification.' },
      { step: '03', title: 'Manufacturing', desc: 'Factory fabrication to exact specifications.' },
      { step: '04', title: 'Installation', desc: 'Professional fitting with weatherproofing.' },
    ],
    benefits: ['Toughened safety glass', 'Premium aluminum profiles', 'Sound insulation', 'Weather-sealed', 'Smooth sliding mechanism', 'Customizable finishes'],
    faqs: [
      { q: 'What type of glass do you use?', a: 'We use 10-12mm toughened glass for safety. Laminated and double-glazed options are also available.' },
      { q: 'Are sliding doors energy efficient?', a: 'Yes, our aluminum sliding doors with thermal break profiles offer excellent insulation and energy efficiency.' },
    ],
  },
  'plumbing-electrical': {
    heroImage: 'https://res.cloudinary.com/doo2og4l3/image/upload/v1778941583/photo-1621905251189-08b45d6a269e_d25b4a.jpg',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80', alt: 'Plumbing installation work' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80', alt: 'Electrical wiring installation' },
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80', alt: 'Modern bathroom plumbing' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', alt: 'Smart home electrical setup' },
    ],
    process: [
      { step: '01', title: 'Planning', desc: 'Complete layout planning for plumbing and electrical points.' },
      { step: '02', title: 'Rough Work', desc: 'Channel cutting, pipe laying, and wiring installation.' },
      { step: '03', title: 'Fitting', desc: 'Installing fixtures, switches, and sanitary ware.' },
      { step: '04', title: 'Testing', desc: 'Pressure testing, continuity testing, and safety checks.' },
    ],
    benefits: ['ISI-certified materials', 'Licensed electricians', 'Safety compliance', 'Modern MCB/RCCB panels', 'Concealed wiring', 'Water pressure optimization'],
    faqs: [
      { q: 'Do you provide ISI-certified materials?', a: 'Yes, all our plumbing pipes (CPVC/PPR) and electrical wires (Havells/Polycab) are ISI certified.' },
      { q: 'Do you handle complete bathroom renovation?', a: 'Yes, we provide end-to-end bathroom renovation including demolition, waterproofing, plumbing, tiling, and fixture installation.' },
    ],
  },
};

// ─── Image Lightbox ───────────────────────────────────────────────────────────

function ImageLightbox({ images, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const goTo = useCallback(
    (idx) => {
      setImgLoaded(false);
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current]
  );

  const prev = useCallback(() => goTo((current - 1 + images.length) % images.length), [current, goTo, images.length]);
  const next = useCallback(() => goTo((current + 1) % images.length), [current, goTo, images.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next, onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.97 }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ backgroundColor: '#ffffff' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* ── Top bar ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-700 text-sm font-bold">
            {current + 1}
          </span>
          <span className="text-gray-400 text-sm">of {images.length}</span>
          <span className="hidden sm:block text-gray-700 text-sm font-medium ml-2 truncate max-w-sm">
            {images[current].alt}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── Main image area ── */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden p-4 md:p-8">
        {/* Prev button */}
        <button
          onClick={prev}
          className="absolute left-3 md:left-6 z-20 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:border-primary-300 hover:text-primary-600 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Image */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="w-full h-full flex items-center justify-center px-16"
          >
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-4 border-primary-100 border-t-primary-500 animate-spin" />
              </div>
            )}
            <img
              key={images[current].src}
              src={images[current].src}
              alt={images[current].alt}
              onLoad={() => setImgLoaded(true)}
              className={cn(
                'max-h-[calc(100vh-220px)] max-w-full w-auto object-contain rounded-2xl shadow-xl transition-opacity duration-300',
                imgLoaded ? 'opacity-100' : 'opacity-0'
              )}
              style={{ maxWidth: '90vw' }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        <button
          onClick={next}
          className="absolute right-3 md:right-6 z-20 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:border-primary-300 hover:text-primary-600 transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className="flex-shrink-0 border-t border-gray-100 py-4 px-6">
        <div className="flex gap-2 overflow-x-auto justify-center pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200',
                i === current
                  ? 'border-primary-500 shadow-md scale-105'
                  : 'border-transparent opacity-50 hover:opacity-80 hover:border-gray-300'
              )}
              style={{ width: 72, height: 52 }}
              aria-label={`Image ${i + 1}`}
            >
              <img
                src={img.thumb || img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Sub-section gallery card ─────────────────────────────────────────────────

function SubSectionGallery({ section, onImageClick }) {
  const IconComp = LucideIcons[section.icon] || LucideIcons.Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start gap-4 p-6 pb-0">
        <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center flex-shrink-0 mt-1">
          <IconComp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="font-heading text-xl font-bold text-gray-900">{section.title}</h4>
          <p className="text-gray-500 text-sm mt-1 leading-relaxed">{section.description}</p>
        </div>
      </div>

      {/* Image Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {section.images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => onImageClick(section.images, i)}
              className="group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
              style={{ aspectRatio: '4/3' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <img
                src={img.thumb || img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ display: 'block', width: '100%', height: '100%', minHeight: '120px' }}
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-gray-800" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Service Sub Sections Block ───────────────────────────────────────────────

function ServiceSubSections({ serviceId, openEnquiry, serviceName }) {
  const [lightbox, setLightbox] = useState(null);
  const config = serviceSubSections[serviceId];
  if (!config) return null;

  const SectionIcon = LucideIcons[config.icon] || LucideIcons.Sparkles;

  return (
    <>
      <section className="py-24 bg-gray-50" aria-label={config.sectionLabel}>
        <div className="container-custom">
          {/* Heading */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500 mb-4">
                <SectionIcon className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold tracking-wide">
                  {config.sectionLabel}
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Our {config.sectionLabel} Range
              </h2>
              <p className="text-gray-500 mt-3 max-w-xl text-base leading-relaxed">
                {config.sectionDesc}
              </p>
            </div>
            <Button
              variant="primary"
              icon={Send}
              iconPosition="left"
              onClick={() => openEnquiry(serviceName)}
              className="flex-shrink-0"
            >
              Get Free Quote
            </Button>
          </div>

          {/* Cards */}
          <div className="space-y-8">
            {config.items.map((section) => (
              <SubSectionGallery
                key={section.id}
                section={section}
                onImageClick={(images, index) => setLightbox({ images, index })}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <ImageLightbox
            images={lightbox.images}
            initialIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      className={cn(
        'bg-white border rounded-2xl overflow-hidden transition-all duration-300',
        isOpen ? 'border-primary-200 shadow-md' : 'border-gray-100'
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <button
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            'font-heading font-semibold text-lg pr-4 transition-colors',
            isOpen ? 'text-primary-700' : 'text-gray-900 group-hover:text-primary-700'
          )}
        >
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            'flex-shrink-0 text-2xl font-light leading-none',
            isOpen ? 'text-primary-600' : 'text-gray-400'
          )}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ServiceDetail() {
  const { slug } = useParams();
  const { openEnquiry } = useEnquiry();
  const sectionRef = useRef(null);
  const [galleryLightbox, setGalleryLightbox] = useState(null);

  const service = useMemo(
    () => servicesData.services.find((s) => s.slug === slug),
    [slug]
  );

  const extended = useMemo(
    () => serviceExtendedData[service?.id] || {},
    [service]
  );

  const allServices = servicesData.services;
  const currentIndex = allServices.findIndex((s) => s.slug === slug);
  const prevService = currentIndex > 0 ? allServices[currentIndex - 1] : null;
  const nextService = currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : null;
  const relatedServices = allServices.filter((s) => s.slug !== slug).slice(0, 3);

  console.log(relatedServices);

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);
        const hero = sectionRef.current;
        if (hero) {
          gsap.to(hero.querySelector('.parallax-img'), {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      } catch (e) {
        console.warn('GSAP not loaded', e);
      }
    };
    loadGSAP();
  }, [slug]);

  if (!service) return <Navigate to="/services" replace />;

  const iconName = iconMap[service.icon] || 'Sparkles';
  const Icon = LucideIcons[iconName] || LucideIcons.Sparkles;

  const galleryImages = (extended.gallery || []).map((item, i) =>
    typeof item === 'string'
      ? { src: item, thumb: item, alt: `${service.title} project ${i + 1}` }
      : item
  );

  return (
    <>
      <SEOHead
        title={`${service.title} Services - ${COMPANY.name} | Premium Solutions`}
        description={service.description}
        url={`/services/${service.slug}`}
        image={typeof (extended.gallery?.[0]) === 'string' ? extended.gallery[0] : extended.gallery?.[0]?.src}
      />
      <SchemaMarkup type="Service" data={service} />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ],
        }}
      />

      {/* ── Hero ── */}
      <section
        ref={sectionRef}
        className="relative flex items-end overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="parallax-img w-full h-[120%] object-cover object-center"
            loading="eager"
            style={{ minHeight: '100%' }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute inset-0" />
        <div className="container-custom relative z-10 pb-16 pt-32">
          <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <span className="text-gray-500">/</span>
            <Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-400">{service.title}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-5 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-primary-300 text-xs font-semibold tracking-widest uppercase">
                  Our Services
                </span>
                <h1 className="font-heading text-3xl md:text-5xl font-bold text-white! leading-tight">
                  {service.title}
                </h1>
              </div>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              {service.shortDescription}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button
                variant="primary"
                size="lg"
                icon={Send}
                iconPosition="left"
                onClick={() => openEnquiry(service.title)}
              >
                Free Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── About + Sidebar ── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500 mb-5">
                <span className="text-white text-sm font-semibold">About This Service</span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                {service.title} — What We Offer
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">{service.description}</p>

              <h3 className="font-heading text-xl font-semibold text-gray-900 mb-4">What's Included</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary-200 hover:bg-primary-50/40 transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sidebar */}
            <div>
              <Card padding="lg" className="bg-gray-50 border-gray-200 sticky top-24">
                <h3 className="font-heading text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  Quick Enquiry
                </h3>
                <p className="text-gray-500 text-sm mb-5">Free quote within 24 hours</p>

                <Button
                  variant="primary"
                  className="w-full mb-3"
                  icon={Send}
                  iconPosition="left"
                  onClick={() => openEnquiry(service.title)}
                >
                  Send Enquiry
                </Button>
                <a href={`tel:${COMPANY.phone}`} className="block mb-3">
                  <Button variant="secondary" className="w-full" icon={Phone} iconPosition="left">
                    Call Us Now
                  </Button>
                </a>
                <Button
                  variant="whatsapp"
                  className="w-full"
                  icon={MessageCircle}
                  iconPosition="left"
                  onClick={() => {
                    const msg = `Hi! I'm interested in your *${service.title}* service. Please share details and pricing.`;
                    window.open(
                      `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`,
                      '_blank'
                    );
                  }}
                >
                  WhatsApp Us
                </Button>

                <div className="mt-6 pt-5 border-t border-gray-200 grid grid-cols-3 gap-2 text-center">
                  {[
                    { icon: Shield, label: 'Warranty' },
                    { icon: Star, label: '5★ Rated' },
                    { icon: Clock, label: 'On Time' },
                  ].map(({ icon: B, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5">
                      <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                        <B className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── Top Gallery ── */}
      {galleryImages.length > 0 && (
        <section className="py-20 bg-gray-50" aria-label="Gallery">
          <div className="container-custom">
            <SectionHeading
              subtitle="Gallery"
              title={`${service.title} — Our Work`}
              description="Click any image to view in full screen."
            />

            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <motion.button
                  key={i}
                  onClick={() => setGalleryLightbox({ images: galleryImages, index: i })}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl shadow-sm focus:outline-none cursor-pointer',
                    i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                  )}
                  style={{ minHeight: i === 0 ? 400 : 220 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <img
                    src={img.thumb || img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ display: 'block', width: '100%', height: '100%', minHeight: i === 0 ? 400 : 220 }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}
                  >
                    <div className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-gray-800" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Sub-sections (Furniture / Ceiling / Flooring) ── */}
      <ServiceSubSections
        serviceId={service.id}
        openEnquiry={openEnquiry}
        serviceName={service.title}
      />

      {/* ── Process ── */}
      {extended.process && (
        <section className="py-20 bg-white" aria-label="Process">
          <div className="container-custom">
            <SectionHeading
              subtitle="Our Process"
              title={`How We Deliver ${service.title}`}
              description="A structured approach ensuring quality and satisfaction at every step."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {extended.process.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card className="h-full relative overflow-hidden group" padding="lg">
                    <span className="absolute top-3 right-4 text-7xl font-heading font-bold text-primary-50 group-hover:text-primary-100 transition-colors select-none pointer-events-none">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center mb-4">
                      <span className="text-white font-bold font-heading text-sm">{step.step}</span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Benefits ── */}
      {extended.benefits && (
        <section className="py-20 bg-gray-50" aria-label="Benefits">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading
                  subtitle="Why Choose Us"
                  title={`Advantages of Our ${service.title}`}
                  align="left"
                />
                <div className="space-y-3">
                  {extended.benefits.map((b, i) => (
                    <motion.div
                      key={b}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-primary-200 transition-all"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{b}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div
                className="rounded-3xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ minHeight: 400 }}
              >
                <img
                  src={extended.heroImage || service.image}
                  alt={`${service.title} benefits`}
                  className="w-full object-cover"
                  style={{ height: 420 }}
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {extended.faqs && extended.faqs.length > 0 && (
        <section className="py-20 bg-white" aria-label="FAQ">
          <div className="container-custom max-w-4xl">
            <SectionHeading subtitle="FAQ" title={`${service.title} — Common Questions`} />
            <div className="space-y-4">
              {extended.faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related Services ── */}
      <section className="py-20 bg-gray-50" aria-label="Related services">
        <div className="container-custom">
          <SectionHeading subtitle="Explore More" title="Other Services You May Like" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((rs, i) => {
              const rsIconName = iconMap[rs.icon] || 'Sparkles';
              const RsIcon = LucideIcons[rsIconName] || LucideIcons.Sparkles;
              return (
                <motion.div
                  key={rs.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link to={`/services/${rs.slug}`}>
                    <Card className="h-full group overflow-hidden" padding="none">
                      <div className="overflow-hidden" style={{ height: 220 }}>
                        <img
                          src={rs.image}
                          alt={rs.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          style={{ display: 'block' }}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0">
                            <RsIcon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="font-heading text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                            {rs.title}
                          </h3>
                        </div>
                        <p className="text-gray-500 text-sm line-clamp-2">{rs.shortDescription}</p>
                        <div className="mt-4 flex items-center gap-1.5 text-primary-600 text-sm font-semibold">
                          <span>View Service</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Prev / Next ── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {prevService ? (
              <Link
                to={`/services/${prevService.slug}`}
                className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-primary-300 group-hover:bg-primary-50 transition-all">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Previous</span>
                  <span className="font-medium text-sm">{prevService.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextService ? (
              <Link
                to={`/services/${nextService.slug}`}
                className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors group text-right"
              >
                <div>
                  <span className="text-xs text-gray-400 block">Next</span>
                  <span className="font-medium text-sm">{nextService.title}</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-primary-300 group-hover:bg-primary-50 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <CTABanner
        title={`Need ${service.title}?`}
        description={`Get a free consultation for your ${service.title.toLowerCase()} project. Our experts are ready to help!`}
        primaryAction={{ label: 'Send Enquiry', link: '/contact' }}
        variant="default"
      />

      {/* ── Gallery lightbox ── */}
      <AnimatePresence>
        {galleryLightbox && (
          <ImageLightbox
            images={galleryLightbox.images}
            initialIndex={galleryLightbox.index}
            onClose={() => setGalleryLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}