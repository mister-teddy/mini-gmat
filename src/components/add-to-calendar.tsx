import { FC } from "react";
import { atcb_action } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';
import Button from "./button";
import { useRecoilValue } from "recoil";
import { appInfoState } from "../state/settings";
import { isIos, openExternal } from "../utils/sdk";

export const AddToCalendar: FC = () => {
  const appInfo = useRecoilValue(appInfoState);
  return (
    <Button onClick={(e) => {
      if (isIos) {
        return openExternal(`https://tinyurl.com/rv8nu2cp`);
      }
      // openExternal(`https://nguyenhongphat0.github.io/tunnel.html?state=${encodeURIComponent(JSON.stringify({
      //   origin: `data:text/calendar;charset=utf-8,BEGIN%3AVCALENDAR%0D%0AVERSION%3A2.0%0D%0APRODID%3A-%2F%2F%20https%3A%2F%2Fadd-to-calendar-pro.com%20%2F%2F%20button%20v1.18.6%20%2F%2FEN%0D%0ACALSCALE%3AGREGORIAN%0D%0AMETHOD%3APUBLISH%0D%0ABEGIN%3AVTIMEZONE%0D%0ATZID%3AEurope%2FBerlin%0D%0AX-LIC-LOCATION%3AEurope%2FBerlin%0D%0ALAST-MODIFIED%3A20221015T115821Z%0D%0ABEGIN%3ADAYLIGHT%0D%0ATZNAME%3ACEST%0D%0ATZOFFSETFROM%3A%2B0100%0D%0ATZOFFSETTO%3A%2B0200%0D%0ADTSTART%3A19700329T020000%0D%0ARRULE%3AFREQ%3DYEARLY%3BBYMONTH%3D3%3BBYDAY%3D-1SU%0D%0AEND%3ADAYLIGHT%0D%0ABEGIN%3ASTANDARD%0D%0ATZNAME%3ACET%0D%0ATZOFFSETFROM%3A%2B0200%0D%0ATZOFFSETTO%3A%2B0100%0D%0ADTSTART%3A19701025T030000%0D%0ARRULE%3AFREQ%3DYEARLY%3BBYMONTH%3D10%3BBYDAY%3D-1SU%0D%0AEND%3ASTANDARD%0D%0AEND%3AVTIMEZONE%0D%0ABEGIN%3AVEVENT%0D%0AUID%3Ad826b363-fd89-47aa-af6e-81e786adc717%0D%0ADTSTAMP%3A20221113T212244Z%0D%0ADTSTART%3BTZID%3DEurope%2FBerlin%3A20230214T101500%0D%0ADTEND%3BTZID%3DEurope%2FBerlin%3A20230214T233000%0D%0ASUMMARY%3AReminder%20to%20star%20the%20add%20to%20calendar%20button%20repo%0D%0ADESCRIPTION%3ACheck%20out%20the%20maybe%20easiest%20way%20to%20include%20add%20to%20calendar%20b%0D%0A%20uttons%20to%20your%20website%20at%3A%5Cn%E2%86%92%20https%3A%2F%2Fgithub.com%2Fadd2cal%2Fadd%0D%0A%20-to-calendar-button%0D%0AX-ALT-DESC%3BFMTTYPE%3Dtext%2Fhtml%3A%0D%0A%20%3C!DOCTYPE%20HTML%20PUBLIC%20%22%22-%2F%2FW3C%2F%2FDTD%20HTML%203.2%2F%2FEN%22%22%3E%0D%0A%20%3CHTML%3E%3CBODY%3E%0D%0A%20Check%20out%20the%20maybe%20easiest%20way%20to%20include%20add%20to%20calendar%20b%0D%0A%20uttons%20to%20your%20website%20at%3A%3Cbr%3E%E2%86%92%20%3Ca%20href%3D%22https%3A%2F%2Fgithub.com%2F%0D%0A%20add2cal%2Fadd-to-calendar-button%22%20target%3D%22_system%22%20rel%3D%22noopen%0D%0A%20er%22%3Ehttps%3A%2F%2Fgithub.com%2Fadd2cal%2Fadd-to-calendar-button%3C%2Fa%3E%0D%0A%20%3C%2FBODY%3E%3C%2FHTML%3E%0D%0ALOCATION%3AWorld%20Wide%20Web%0D%0ASEQUENCE%3A0%0D%0ASTATUS%3ACONFIRMED%0D%0ACREATED%3A20221113T212239Z%0D%0ALAST-MODIFIED%3A20221113T212239Z%0D%0AEND%3AVEVENT%0D%0AEND%3AVCALENDAR`,
      //   clearParams: true
      // }))}`);
      const url = appInfo.appUrl;
      const now = new Date();
      atcb_action({
        name: "Keep calm and study GMAT",
        description: "Add this recurring event to your calendar and set alarm for it\nThêm cái này vào lịch của bạn và nhớ đặt báo thức hằng ngày",
        location: url,
        startDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        startTime: `19:00`,
        endTime: `21:00`,
        "timeZone": "Asia/Ho_Chi_Minh",
        recurrence: "RRULE:FREQ=DAILY;INTERVAL=1;WKST=MO;COUNT=30",
        options: ["Google", "Outlook.com"],
        trigger: "click",
      }, e.currentTarget);
    }} large className='w-full text-lg'>⏰</Button>
  );
}
