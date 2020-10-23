import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

import {UserData} from '../../../@core/data/users';
import {LayoutService} from '../../../@core/utils';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  checked: boolean = false;
  date = new Date();

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private router: Router,
              protected authenticationService: AuthenticationService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;

    if (this.date.getHours() < 6 || this.date.getHours() > 18) {
      this.checked = true;
      this.themeService.changeTheme('dark');
    }

    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === 'Profile') {
        this.router.navigate(['/pages/profile']).then();
      } else if (event.item.title === 'Log out') {
        this.authenticationService.logout();
        this.router.navigate(['/auth/login']);
      }
    });
  }

  checkedChange() {
    if (this.checked) {
      this.themeService.changeTheme('dark');
    } else {
      this.themeService.changeTheme('default');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
