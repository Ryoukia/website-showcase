# cs373-idb-15

## WorldEats

Website Link: https://worldeats.us

## Group Members

Names: Lauren Hubbard, Raunakk Chandhoke, Alejandro Cisneros, Colin Lessor, Janlloyd Carangan

UT EIDs: lh33842, rsc2575, aac4752, cl46375, jcc5839

GitLab IDs: @lhub2001, @Raul21.13, @aacisneros444, @Ryoukia, @carangan


Project Leader (Phase IV): Janlloyd Carangan

## API Documentation

Postman Link: https://documenter.getpostman.com/view/25838982/2s93CExciz

## Repository Information

Git SHA: 289435efd967182ece0fab5ae83fbce906318e77

Pipeline: https://gitlab.com/lhub2001/cs373-idb-15/-/pipelines

## Estimated/Actual Completion Times:

- Lauren: Estimated 10 hours, Actual 13 hours
- Raunakk: Estimated 10 hours, Actual 14 hours
- Alejandro: Estimated 11 hours, Actual 12 hours
- Colin: Estimated 9 hours, Actual 11 hours
- Janlloyd: Estimated 11 hours, Actual 11 hours

## Comments

Phase IV: The pipeline passes, albeit without jest or selenium tests. The jest test works, but it breaks
upon having to process BarChart.js, PieChart.js, and ScatterPlot.js, since they all use the D3 library.
Jest uses CommonJS while D3 only works with ES6, making the jest test unable to pass. For the selenium 
test, we unfortunately could not find a way to make it work with a Selenium JS test file. Looking back,
it most likely would have been easier to write the tests in Python.

Phase III: Our CI minutes are still completely gone, so the pipeline still fails. Also, our
developers have failed to provide user stories to us before the deadline, meaning the technical report merely assesses our progress on previous user stories rather than discusses current ones. If user stories are seen, they will most likely be after the deadline, or at least after our submission. We will try to reply to them on the issue board as they come.

Phase II: Our CI minutes ran out midway through the project, which is why the pipeline is failing.

Phase I: There was a lot of learning completely new languages and concepts within a short period of time. We look forward to future phases where we get more time to plan and space work out.