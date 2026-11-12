# C03: 1,000 runs, one at a time

**Carousel:** 2026-11-12

A data collection of about 1,000 runs that takes days, on a single setup, with nobody
watching. The pattern, without the specifics of my research:

1. **One setup, so one run at a time.** A queue hands the setup one run, waits for it to
   finish, then hands it the next.
2. **Each run is saved as soon as it finishes.** A crash can only lose the run in progress.
3. **If anything dies, it restarts on its own:** the simulator, the container, or the whole
   computer after a power cut. It skips the runs already done.
4. **Checking progress is one command:** `tail -n 1 progress.log` prints the last line of
   the log, for example `413/1000 done`. No AI needed.

The restart part is the same idea as [R02](R02-power-cuts.md). Its code, `resume-runner`,
goes public here in December.

Cost: **$0.** Plain scripts, Docker Engine (open source) and `tail`. No AI at any step.
