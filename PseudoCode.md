# Ad Agency Manager – Pseudocode Overview

## Data Structures

### Brand
- `name`: Name of the brand.
- `daily_budget`: Maximum spend allowed per day.
- `monthly_budget`: Maximum spend allowed per month.
- `daily_spend`: Total accumulated spend for the current day.
- `monthly_spend`: Total accumulated spend for the current month.
- `campaigns`: List of associated Campaign objects.

### Campaign
- `brand`: Reference to the parent Brand.
- `name`: Name of the campaign.
- `is_active`: Boolean indicating whether the campaign is currently active.
- `start_hour`: Optional – Start time (hour) for dayparting logic.
- `end_hour`: Optional – End time (hour) for dayparting logic.

---

## Following Functions Are Defined On Data Structures

### 1. Record Spend
- Input: `amount`
- Actions:
  - Add `amount` to both `daily_spend` and `monthly_spend` of the brand.
  - If `daily_spend >= daily_budget` or `monthly_spend >= monthly_budget`:
    - Deactivate all campaigns for the brand.

### 2. Daily Reset
- Trigger: Start of a new day.
- Actions:
  - Set `daily_spend = 0` for all brands.
  - Check if campaigns can be reactivated (within budget and correct hour if dayparting is applied).

### 3. Monthly Reset
- Trigger: Start of a new month.
- Actions:
  - Set `monthly_spend = 0` for all brands.
  - Check if campaigns can be reactivated (same logic as daily).

### 4. Dayparting
- For each campaign:
  - If `start_hour` and `end_hour` are defined:
    - Only activate the campaign if the current time is within the specified range.

---
