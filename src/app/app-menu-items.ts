export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  states: string[];
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

export const AppMenunItems = [
  {
    label: 'User',
    main: [
      {
        states: ['/', 'admin', 'users'],
        short_label: 'U',
        name: 'User',
        type: 'link',
        icon: 'fa fa-users'
      }
    ]
  },
  {
    label: 'ACL',
    main: [
      {
        main_state: 'acl',
        states: ['/', 'acl', 'roles'],
        short_label: 'R',
        name: 'Role',
        type: 'link',
        icon: 'fa fa-book'
      }
    ]
  }
];
