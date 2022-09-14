## Utility Front Group Political Advertisement Spend Tracker

Political advertisements from 18 utility front groups were compiled and stored in a publicly accessible table, using data from Facebook’s Ad Library. 

Facebook’s Ad Library went into effect on May 7th, 2018, but actual enforcement began at a later date, on May 24th, 2018. 

For the purpose of our analysis, we used a study period running from May 24th, 2018, when enforcement began, to September 7th, 2022. Our dataset contains 14,060 ads created during the study period, as summarized in the table below:

| Time Period                      | Number of Front Groups | Total Ads | Total Spend             |
|----------------------------------|------------------------|-----------|-------------------------|
| May 24, 2018 - September 7, 2022 | 18                     | 14,060    | $3,270,800 - $5,257,100 |


Meta publishes each ad that it or advertisers deem political along with some metadata on its Ad Library site and in an API.

The data was accessed through a Python program, built using existing code from Brown University, to fetch and aggregate data from the Facebook Ad Library. The political ads in the library are accessible through an API. For each ad, the API contains a unique ID, impression counts and the dollar amount spent on the ad, as well as the dates when the ad campaign started and ended. Facebook releases ad impressions and spend data in imprecise ranges, such as $ 0 – $ 100 spend, or 1,000 – 5,000 impressions. Since exact data is not available, the amount a front group spent on ads is displayed in a range. 

