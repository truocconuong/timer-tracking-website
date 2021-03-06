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
      },
      {
        states: ['/', 'admin', 'users', 'work-times'],
        short_label: 'U',
        name: 'Work times',
        type: 'link',
        icon: 'fa fa-calendar'
      },
      {
        states: ['/', 'admin', 'users', 'documents'],
        short_label: 'U',
        name: 'Document',
        type: 'link',
        icon: 'fa fa-file-text'
      }
    ]
  },

  {
    label: 'Setting',
    main: [
      {
        main_state: 'setting',
        states: ['/admin', 'settings'],
        short_label: 'R',
        name: 'Setting',
        type: 'link',
        icon: 'fa fa-setting'
      }
    ]
  }
];
