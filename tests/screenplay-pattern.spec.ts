import { test, expect } from '@playwright/test';
import { BrowseTheWeb } from '../screenplay/abilities/BrowseTheWeb.js';
import { Actor } from '../screenplay/actors/Actor.js';
import { Navigate } from '../screenplay/tasks/Navigate.js';
import { FillForm } from '../screenplay/tasks/FillForm.js';
import { SubmitForm } from '../screenplay/tasks/SubmitForm.js';
import { Visibility } from '../screenplay/questions/Visibility.js';

test.describe('Screenplay Pattern', () => {
  test('verify actor can log in using Screenplay pattern', async ({ page }) => {
    const actor = Actor.named('QA User').whoCan(BrowseTheWeb.using(page));

    const ability = actor.abilityToBrowseTheWeb();

    await Navigate.to('/practice-test-login/').performAs(ability);

    await FillForm.withCredentials('student', 'Password123').performAs(ability);

    await SubmitForm.now().performAs(ability);

    const logoutVisible = await Visibility.of('a:has-text("Log out")').answeredBy(ability);

    expect(logoutVisible).toBeTruthy();
  });
});
