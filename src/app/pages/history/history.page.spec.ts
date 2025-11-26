import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryPage } from './history.page';
import { ApiService } from '../../../services/api.service';

class ApiMock { get = jasmine.createSpy('get').and.returnValue(Promise.resolve({ days: ['1','2'], values: [3,4] })); }

describe('HistoryPage', () => {
  let page: HistoryPage;
  let api: ApiMock;

  beforeEach(() => {
    api = new ApiMock();
    page = new HistoryPage(api as any);
    // avoid DOM canvas - spy renderChart
    spyOn(page as any, 'renderChart').and.callFake(() => {});
  });

  it('loadData() obtiene datos y llama renderChart', async () => {
    await page.loadData();
    expect(api.get).toHaveBeenCalled();
    expect((page as any).renderChart).toHaveBeenCalledWith(['1','2'], [3,4]);
  });
});
