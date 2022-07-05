export const MIN_START_DATE = '1995-01-01';
export const US_DATE = 'yyyy-MM-dd';

/* tension marker values */
export const SIS_VALUES = [90, 120, 130, 140, 160, 180];
export const DIA_VALUES = [60, 80, 85, 90, 100, 110];
export const PULSE_VALUES = [60, 80, 100];
export const PULSE_PRESSURE_VALUES = [40, 50, 60];
export const MEDIAN_PRESSURE_VALUES = [70, 85, 100];

/* index.css styles */
export const S_HIPO = '-hipo';
export const S_OPTIM = '-optim';
export const S_NORMAL = '-normal';
export const S_INALT = '-inalt';
export const S_GRAD_1 = '-grad-1';
export const S_GRAD_2 = '-grad-2';
export const S_GRAD_3 = '-grad-3';
export const S_SIS_IZOLATA = '-sis-izolata';
export const S_DEFAULT = '-default';
export const S_PRIMARY = '-primary';
export const S_ACCENT = '-accent';
export const S_ALERT = '-alert';
export const S_LIGHT = '-light';
export const S_GREY_2 = '-grey-2';

/* color #codes */
export const C_PRIMARY = '#67c';
export const C_PRIMARY_LIGHT = '#bcf';
export const C_PRIMARY_DARK = '#45a';
export const C_ACCENT = '#9b5088';
export const C_ACCENT_LIGHT = '#eba0d8';
export const C_GRAY_1 = '#fbfbff';
export const C_GRAY_2 = '#cfcfe0';
export const C_GRAY_3 = '#acacc3';
export const C_GRAY_4 = '#55556c';
export const C_GRAY_5 = '#32323b';
export const C_GRAY_SIDE_1 = '#d8d8e7';
export const C_GRAY_SIDE_2 = '#bfbfd2';
export const C_GRAY_SIDE_3 = '#9b9bb2';
export const C_LIGHT = '#fff';
export const C_HIPO = '#5df';
export const C_OPTIM = '#0ad';
export const C_NORMAL = '#3ca';
export const C_INALT = '#9d7';
export const C_GRAD_1 = '#fa1';
export const C_GRAD_2 = '#f33';
export const C_GRAD_3 = '#c15';
export const C_SIS_IZOLATA = '#9077ff';

/* labels */
export const L_HIPO = 'Hipo-t.';
export const L_OPTIM = 'Optimă';
export const L_NORMAL = 'Normală';
export const L_INALT = 'Înaltă';
export const L_GRAD_1 = 'Grad 1';
export const L_GRAD_2 = 'Grad 2';
export const L_GRAD_3 = 'Grad 3';
export const L_SIS_IZOLATA = 'Sis-izolată';
export const L_SIS = 'Sistolică';
export const L_DIA = 'Diastolică';
export const L_TA = 'Tensiune arterială';
export const L_PULSE = 'Puls';
export const L_PULSE_PRESSURE = 'Presiune puls';
export const L_MEDIAN_PRESSURE = 'Presiune arterială medie';
export const L_WEIGHT = 'Greutate';

/* routes */
export const R_LANDING = '/landing';
export const R_SIGNUP = '/signup';
export const R_SIGNIN = '/signin';
export const R_RESET_PASS = '/reseteaza-parola';
export const R_TERMS = '/termeni';
export const R_PRIVACY = '/confidentialitate';
export const R_CALENDAR = '/calendar';
export const R_READING = '/citire';
export const R_HELP = '/ajutor';
export const R_ABOUT_HT = '/despre-hipertensiune';
export const R_HOME = '/acasa';
export const R_IMP_EXP = '/import-export';
export const R_HISTORY = '/istoric';
export const R_MEDICATION = '/medicatie';
export const R_REPORT = '/raport';
export const R_STATISTICS = '/statistici';
export const R_CONTACT = '/contact';
export const R_PROFILE = '/profil';
export const R_UPDATE_NICK = '/update-nickname';
export const R_UPDATE_MAIL = '/update-email';
export const R_UPDATE_PASS = '/update-password';
export const R_UPDATE_INFO = '/update-info';
export const R_LOGGED_OUT = '/logged-out';

/* modal types */
export const M_ERROR = 'error';
export const M_DELETE_READING = 'delete-reading';
export const M_EMAIL_CHANGE = 'email-change';
export const M_EMAIL_VERIFIED = 'email-verified';

/* button types */
export const B_DARK = 'dark-btn';
export const B_TEXT = 'text-btn';
export const B_CANCEL = 'cancel-btn';

/* filter related */
export const F_ARM = 'arm';
export const F_LEFT = 'left';
export const F_RIGHT = 'right';
export const F_BOTH = 'both';
export const F_HOURS = 'hours';
export const F_NIGHT = 'night';
export const F_MORNING = 'morning';
export const F_AFTERNOON = 'afternoon';
export const F_EVENING = 'evening';
export const F_24H = '24h';
export const F_DAYS = 'days';

/* NIVO charts common theme */
export const THEME_4_NIVO = {
  // background: 'transparent',
  // fontFamily: 'sans-serif',
  // fontSize: 11,
  textColor: C_GRAY_5,
  axis: {
    domain: {
      line: {
        stroke: C_GRAY_3
        // strokeWidth: 1,
      }
    },
    ticks: {
      line: {
        stroke: C_GRAY_3
        // strokeWidth: 1,
      }
      // text: {},
    },
    legend: {
      text: {
        // fontSize: 12,
        fill: C_GRAY_5
      }
    }
  },
  grid: {
    line: {
      stroke: C_GRAY_3,
      strokeDasharray: '1, 2'
      // strokeWidth: 1,
    }
  }
  // legends: {
  //     hidden: {
  //         symbol: {
  //             fill: C_GRAY_4,
  //             opacity: 0.6,
  //         },
  //         text: {
  //             fill: C_GRAY_4,
  //             opacity: 0.6,
  //         },
  //     },
  //     text: {},
  //     ticks: {
  //         line: {
  //             stroke: '#777777',
  //             strokeWidth: 1,
  //         },
  //         text: {
  //             fontSize: 10,
  //         },
  //     },
  //     title: {
  //         text: {},
  //     },
  // },
  // labels: {
  //     text: {},
  // },
  // markers: {
  //     lineColor: '#000000',
  //     lineStrokeWidth: 1,
  //     text: {},
  // },
  // dots: {
  //     text: {},
  // },
  // tooltip: {
  //     container: {
  //         background: 'white',
  //         color: 'inherit',
  //         fontSize: 'inherit',
  //         borderRadius: '2px',
  //         boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
  //         padding: '5px 9px',
  //     },
  //     basic: {
  //         whiteSpace: 'pre',
  //         display: 'flex',
  //         alignItems: 'center',
  //     },
  //     chip: {
  //         marginRight: 7,
  //     },
  //     table: {},
  //     tableCell: {
  //         padding: '3px 5px',
  //     },
  //     tableCellValue: {
  //         fontWeight: 'bold',
  //     },
  // },
  // crosshair: {
  //     line: {
  //         stroke: '#000000',
  //         strokeWidth: 1,
  //         strokeOpacity: 0.75,
  //         strokeDasharray: '6 6',
  //     },
  // },
  // annotations: {
  //     text: {
  //         fontSize: 13,
  //         outlineWidth: 2,
  //         outlineColor: '#ffffff',
  //         outlineOpacity: 1,
  //     },
  //     link: {
  //         stroke: '#000000',
  //         strokeWidth: 1,
  //         outlineWidth: 2,
  //         outlineColor: '#ffffff',
  //         outlineOpacity: 1,
  //     },
  //     outline: {
  //         fill: 'none',
  //         stroke: '#000000',
  //         strokeWidth: 2,
  //         outlineWidth: 2,
  //         outlineColor: '#ffffff',
  //         outlineOpacity: 1,
  //     },
  //     symbol: {
  //         fill: '#000000',
  //         outlineWidth: 2,
  //         outlineColor: '#ffffff',
  //         outlineOpacity: 1,
  //     },
  // },
};
