import { test, expect } from '@playwright/test';

import { testData } from '../data.mjs';
import { InitApp } from '../pages/initapp.mjs';
import { DesignBuy } from '../pages/designbuy.mjs';
import { WindowType } from '../pages/windowstype.mjs';
import { WindowDesign } from '../pages/windowsdesign.mjs';

test.describe('Menards Tests', () => {

  test('Design Window with Instore User Login', async ({ page }) => {
    await new InitApp(page).open(testData.url);
    await new InitApp(page).InitiateApp("Windows", testData.appType, "Instore");
    await new DesignBuy(page).navigateToStartDesign();
    await new WindowType(page).verifyUserName(testData.appType.firstName);
    await new WindowType(page).verifyProjectTypeOptions();
    await new WindowType(page).selectWindow(testData.projectTypeWithNailing, testData.windowType1);
    await new WindowDesign(page).continueInformation();
    await new WindowDesign(page).designWindow(testData.windowDesign1.sizing, testData.windowDesign1.designOptions, 
      testData.windowDesign1.glassOption, testData.windowDesign1.windowAccessories1 )
  });


  //without name in test data
});