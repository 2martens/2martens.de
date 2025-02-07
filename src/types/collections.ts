export interface Post {
    id: string;
    title: string;
    slug: string;
    visible: boolean;
    description: string;
    category: string;
    author: string;
    content: any;
    updatedAt: Date;
    createdAt: Date;
    publishedAt: Date;
  }
  
  export interface HeaderCard {
    id: string;
    name: string;
    description: string;
    order: number;
    icon: string;
    updatedAt: Date;
    createdAt: Date;
  }
  
  export interface HeaderMenuItem {
    id: string;
    name: string;
    link: string;
    order: number;
    updatedAt: Date;
    createdAt: Date;
  }
  
  export interface FooterSocialMediaIcon {
    id: string;
    name: string;
    icon: string;
    link: string;
    order: number;
    updatedAt: Date;
    createdAt: Date;
  }
  
  export interface FooterMenuItem {
    id: string;
    name: string;
    link: string;
    order: number;
    updatedAt: Date;
    createdAt: Date;
  }
  
  export interface Category {
    id: string;
    title: string;
    slug: string;
    href: string;
    updatedAt: Date;
    createdAt: Date;
  }
  
  export interface Author {
    id: string;
    name: string;
    slug: string;
    href: string;
    role: string;
    imageUrl: string;
    updatedAt: Date;
    createdAt: Date;
  }
  